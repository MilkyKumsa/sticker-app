"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CartItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size?: string;
}

const sizePricing: Record<string, number> = {
  "Small (5 cm)": 40,
  "Medium (8 cm)": 60,
  "Large (12 cm)": 100,
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stickersCart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (error) {
          console.error("Unable to parse cart for checkout", error);
        }
      }
    }
  }, []);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item.size ? sizePricing[item.size] ?? 0 : 0;
        return sum + price;
      }, 0),
    [items]
  );

  const removeItem = (id: number) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem("stickersCart", JSON.stringify(next));
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (items.length === 0) {
      alert("Your cart is empty!");
      setLoading(false);
      return;
    }

    const orderItems = items.map((item) => ({
      sticker: item.title,
      size: item.size ?? "Not selected",
      price: item.size ? sizePricing[item.size] ?? 0 : 0,
    }));

    const payableAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

    let data;
    try {
      const res = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          items: orderItems,
          payableAmount,
        }),
      });

      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send order");
    } catch (err: any) {
      alert(err.message);
      setLoading(false);
      return;
    }

    alert("Order sent successfully!");
    localStorage.removeItem("stickersCart");
    setItems([]);
    setShowForm(false);
    setFormData({ name: "", phone: "" });
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#eef2ff] via-white to-[#f5f3ff] text-gray-800 pt-28 pb-16 px-6">
      <div className="pointer-events-none absolute inset-0 gradient-ring opacity-80"></div>
      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Secure Checkout</p>
            <h1 className="text-4xl font-bold text-indigo-700 mt-2">Review & Confirm</h1>
            <p className="text-gray-500 mt-1">Take one last look before we start printing.</p>
          </div>
          <Link href="/stickers" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Stickers
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass-panel text-center p-12">
            <p className="text-gray-500 mb-6">Your cart is empty. Head back and add some stickers!</p>
            <Link
              href="/stickers"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200"
            >
              Browse Stickers
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 glass-panel p-6 space-y-6">
              {items.map((item) => {
                const price = item.size ? sizePricing[item.size] ?? 0 : 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 border-b border-white/70 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain rounded-xl bg-gray-50" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.size ?? "Size not selected"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-700">{price} ETB</p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-1 hover:underline">
                        Remove
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            <section className="glass-panel p-6 h-fit">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm text-gray-600">
                {items.map((item) => {
                  const price = item.size ? sizePricing[item.size] ?? 0 : 0;
                  return (
                    <div key={`summary-${item.id}`} className="flex justify-between">
                      <span>{item.title}</span>
                      <span>{price} ETB</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-white/70 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{total} ETB</span>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200"
              >
                Place Order
              </button>
            </section>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80 z-50 relative">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            <label className="block mb-4">
              <span>Name</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border px-2 py-1 rounded" />
            </label>
            <label className="block mb-4">
              <span>Phone</span>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 w-full border px-2 py-1 rounded" />
            </label>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
