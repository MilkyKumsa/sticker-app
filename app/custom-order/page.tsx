"use client";

import { useState } from "react";

const sizePricing: Record<string, number> = {
  Small: 15,
  Medium: 35,
  Large: 40,
};

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    size: "Small",
    quantity: 5,
    image: null as File | null,
  });

  const [price, setPrice] = useState(sizePricing["Small"]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;

    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
      return;
    }

    const newData = { ...formData, [name]: name === "quantity" ? parseInt(value) : value };
    setFormData(newData);

    // Update price
    const unitPrice = sizePricing[newData.size] ?? 0;
    setPrice(unitPrice * newData.quantity);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) return alert("Please upload an image");
    if (formData.quantity < 5) return alert("Minimum order quantity is 5");

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("phone", formData.phone);
    fd.append("size", formData.size);
    fd.append("quantity", formData.quantity.toString());
    fd.append("image", formData.image);

    setLoading(true);
    try {
      const res = await fetch("/api/sendOrder", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send order");

      alert("Custom order sent successfully!");
      setFormData({ name: "", phone: "", size: "Small", quantity: 5, image: null });
      setPrice(sizePricing["Small"]);
      (document.getElementById("imageInput") as HTMLInputElement).value = "";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">Custom Sticker Order</h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min={5}
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <input
          id="imageInput"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <p className="font-semibold text-indigo-700">Total Price: {price} ETB</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-xl font-bold"
        >
          {loading ? "Sending..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
