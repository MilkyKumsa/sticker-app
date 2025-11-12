"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    {
      name: "Animals",
      image:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Spiritual",
      image:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Tech",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Nature",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
    },
  ];

  const stickers = [
    {
      name: "Cool Cat",
      category: "Animals",
      image: "https://pngimg.com/uploads/cat/cat_PNG50491.png",
    },
    {
      name: "Zen Circle",
      category: "Spiritual",
      image:
        "https://static.vecteezy.com/system/resources/previews/017/350/987/original/zen-circle-free-png.png",
    },
    {
      name: "Football Star",
      category: "Sports",
      image: "https://pngimg.com/uploads/football/football_PNG52777.png",
    },
    {
      name: "Laptop Life",
      category: "Tech",
      image: "https://pngimg.com/uploads/laptop/laptop_PNG5936.png",
    },
    {
      name: "Mountain View",
      category: "Nature",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60",
    },
  ];

  const filteredStickers =
    selectedCategory === "All"
      ? stickers
      : stickers.filter((s) => s.category === selectedCategory);

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Moving background image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/img1.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <motion.div
          className="relative z-10 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-green-400">WeSticker</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Your one-stop shop for vibrant, creative, and high-quality stickers!
          </p>
          <a
            href="#stickers"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Browse Stickers
          </a>
        </motion.div>
      </section>

      {/* Category Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-6 mt-12 mb-12">
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={400}
              height={300}
              className="object-cover w-full h-32 sm:h-40"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">{cat.name}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Category Tabs */}
      <div className="max-w-6xl mx-auto flex gap-3 px-6 mb-6 overflow-x-auto scrollbar-hide">
        {["All", ...categories.map((c) => c.name)].map((cat) => (
          <button
            key={cat}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sticker Grid */}
      <section
        id="stickers"
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6 mb-16"
      >
        {filteredStickers.map((sticker) => (
          <motion.div
            key={sticker.name}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={sticker.image}
              alt={sticker.name}
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold">{sticker.name}</h3>
          </motion.div>
        ))}
      </section>

    </main>
  );
}
