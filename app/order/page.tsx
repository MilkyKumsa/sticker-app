"use client";
import { useState } from "react";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sticker: "",
    quantity: 1,
  });

  const stickers = ["Cute Dog", "Meditation Lotus", "Football Player", "Laughing Emoji", "Cool Sunglasses"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order Placed!\n
Name: ${formData.name}\n
Email: ${formData.email}\n
Sticker: ${formData.sticker}\n
Quantity: ${formData.quantity}`);
    setFormData({ name: "", email: "", sticker: "", quantity: 1 });
  };

  return (
    <main className="min-h-screen bg-green-50 py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-8">Place Your Order</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* Name */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Sticker Selection */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Sticker</span>
          <select
            name="sticker"
            value={formData.sticker}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="" disabled>Select a sticker</option>
            {stickers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        {/* Quantity */}
        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Quantity</span>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={1}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-colors"
        >
          Place Order
        </button>
      </form>
    </main>
  );
}
