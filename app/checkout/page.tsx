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

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800 pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-700">Checkout</h1>
            <p className="text-gray-500 mt-1">Review your stickers before placing the order.</p>
          </div>
          <Link href="/stickers" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Stickers
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-lg text-center">
            <p className="text-gray-500 mb-6">Your cart is empty. Head back and add some stickers!</p>
            <Link
              href="/stickers"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Browse Stickers
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {items.map((item) => {
                const price = item.size ? sizePricing[item.size] ?? 0 : 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain rounded-xl bg-gray-50" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.size ?? "Size not selected"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">{price} ETB</p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-1 hover:underline">
                        Remove
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Order Summary</h2>
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
              <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{total} ETB</span>
              </div>
              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
                Place Order
              </button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

