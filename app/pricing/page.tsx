"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface Sticker {
  id: number;
  title: string;
  category: string;
  image: string;
}

export default function Home() {
  const categories = ["All", "Animals", "Spiritual", "Sports", "Funny", "Cool"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Sticker[]>([]);

  const stickers: Sticker[] = [
    { id: 1, title: "Cute Dog", category: "Animals", image: "https://images.unsplash.com/photo-1601758124097-1e31e47b9a5c?auto=format&fit=crop&w=600&q=60" },
    { id: 2, title: "Meditation Lotus", category: "Spiritual", image: "https://pngall.com/wp-content/uploads/5/Lotus-Flower-PNG-Image.png" },
    { id: 3, title: "Football Player", category: "Sports", image: "https://pngall.com/wp-content/uploads/5/Football-Player-PNG.png" },
    { id: 4, title: "Laughing Emoji", category: "Funny", image: "https://pngall.com/wp-content/uploads/13/Laughing-Emoji-PNG.png" },
    { id: 5, title: "Cool Sunglasses", category: "Cool", image: "https://pngall.com/wp-content/uploads/5/Sunglasses-PNG-Picture.png" },
  ];

  const filteredStickers =
    activeCategory === "All"
      ? stickers
      : stickers.filter((s) => s.category === activeCategory);

  const addToCart = (sticker: Sticker) => {
    setCart([...cart, sticker]);
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/image.jpg"
            alt="Stickers background"
            fill
            className="object-cover brightness-75"
          />
        </motion.div>

        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Welcome to <span className="text-green-400">WeSticker</span>
          </motion.h1>
          <motion.a
            href="#stickers"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
          >
            Browse Stickers
          </motion.a>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50" id="stickers">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Choose a Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium border ${
                  activeCategory === cat
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-green-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 md:px-20">
          {filteredStickers.map((sticker) => (
            <motion.div
              key={sticker.id}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={sticker.image}
                  alt={sticker.title}
                  fill
                  className="object-contain bg-white p-2 rounded-lg"
                />
                {/* Plus Sign */}
                <button
                  onClick={() => addToCart(sticker)}
                  className="absolute top-1 right-1 bg-green-500 hover:bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-lg"
                >
                  +
                </button>
              </div>
              <h3 className="text-lg font-semibold">{sticker.title}</h3>
              <p className="text-sm text-gray-500">{sticker.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Display */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-wrap gap-4">
              {cart.map((item, index) => (
                <li key={index} className="bg-white shadow-md p-2 rounded-lg flex items-center gap-2">
                  <Image src={item.image} alt={item.title} width={40} height={40} className="rounded-md" />
                  <span className="font-medium">{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-6 mt-12">
        <p>© {new Date().getFullYear()} WeSticker. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
