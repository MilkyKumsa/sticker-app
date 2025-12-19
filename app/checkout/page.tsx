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
  quantity: number;
}

const sizePricing: Record<string, number> = {
  "Small (5 cm)": 40,
  "Medium (8 cm)": 60,
  "Large (12 cm)": 100,
};

const MIN_ORDER_QTY = 5;

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stickersCart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure quantity exists
        const normalized = parsed.map((item: any) => ({
          ...item,
          quantity: item.quantity ?? 1,
        }));
        setItems(normalized);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  const saveCart = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem("stickersCart", JSON.stringify(next));
  };

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item.size ? sizePricing[item.size] ?? 0 : 0;
        return sum + price * item.quantity;
      }, 0),
    [items]
  );

  const removeItem = (id: number) => {
    const next = items.filter((item) => item.id !== id);
    saveCart(next);
  };

  const updateQuantity = (id: number, delta: number) => {
    const next = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    saveCart(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (totalQuantity < MIN_ORDER_QTY) {
      alert(`Minimum order is ${MIN_ORDER_QTY} stickers.`);
      setLoading(false);
      return;
    }

    const orderItems = items.map((item) => ({
      sticker: item.title,
      size: item.size ?? "Not selected",
      quantity: item.quantity,
      unitPrice: item.size ? sizePricing[item.size] ?? 0 : 0,
      totalPrice:
        (item.size ? sizePricing[item.size] ?? 0 : 0) * item.quantity,
    }));

    try {
      const res = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          items: orderItems,
          payableAmount: totalPrice,
          totalQuantity,
        }),
      });

      const data = await res.json();
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
    <main className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Checkout</h1>
          <Link href="/stickers" className="text-indigo-600">
            ← Back
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <section className="lg:col-span-2 bg-white p-6 rounded-xl space-y-4">
              {items.map((item) => {
                const unitPrice = item.size
                  ? sizePricing[item.size] ?? 0
                  : 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.size}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded bg-gray-200"
                        >
                          −
                        </button>
                        <span className="font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-indigo-700">
                        {unitPrice * item.quantity} ETB
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            {/* Summary */}
            <section className="bg-white p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Total stickers</span>
                <span>{totalQuantity}</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{totalPrice} ETB</span>
              </div>

              {totalQuantity < MIN_ORDER_QTY && (
                <p className="text-sm text-red-500 mt-3">
                  Minimum order is {MIN_ORDER_QTY} stickers (
                  {MIN_ORDER_QTY - totalQuantity} more needed)
                </p>
              )}

              <button
                onClick={() => {
                  if (totalQuantity < MIN_ORDER_QTY) {
                    alert(`Minimum order is ${MIN_ORDER_QTY} stickers.`);
                    return;
                  }
                  setShowForm(true);
                }}
                className="mt-6 w-full bg-indigo-500 text-white py-3 rounded-xl"
              >
                Place Order
              </button>
            </section>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-80"
          >
            <h2 className="text-xl font-bold mb-4">Your Details</h2>

            <input
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-500 text-white rounded"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
