"use client";
import { useState } from "react";

export default function OrderPage() {
  const [showForm, setShowForm] = useState(false); // modal control
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  // Example cart items (replace with your actual cart state)
  const cartItems = ["Cute Dog", "Meditation Lotus", "Football Player"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, orders: cartItems }),
      });

      if (!res.ok) throw new Error("API error");

      alert("Order sent successfully!");
      setFormData({ name: "", phone: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error sending order:", err);
      alert("Failed to send order. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item} className="text-lg">
            {item}
          </li>
        ))}
      </ul>

      {/* Place Order Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600"
      >
        Place Order
      </button>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-80"
          >
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>

            <label className="block mb-4">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-2 py-1 rounded"
              />
            </label>

            <label className="block mb-4">
              <span>Phone</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full border px-2 py-1 rounded"
              />
            </label>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
                disabled={loading}
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
