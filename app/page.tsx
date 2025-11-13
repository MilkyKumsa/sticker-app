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
    {
      id: 1,
      title: "Playful Puppy",
      category: "Animals",
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Lotus Bloom",
      category: "Spiritual",
      image:
        "https://images.pexels.com/photos/1133951/pexels-photo-1133951.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Soccer Action",
      category: "Sports",
      image:
        "https://images.pexels.com/photos/1142963/pexels-photo-1142963.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      title: "Happy Smile",
      category: "Funny",
      image:
        "https://images.pexels.com/photos/1108095/pexels-photo-1108095.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      title: "Stylish Shades",
      category: "Cool",
      image:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const filteredStickers =
    activeCategory === "All"
      ? stickers
      : stickers.filter((s) => s.category === activeCategory);

  const isInCart = (sticker: Sticker) => cart.some((item) => item.id === sticker.id);

  const toggleCart = (sticker: Sticker) => {
    if (isInCart(sticker)) {
      setCart(cart.filter((item) => item.id !== sticker.id));
    } else {
      setCart([...cart, sticker]);
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.pexels.com/photos/1840429/pexels-photo-1840429.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Colorful sticker background"
            fill
            className="object-cover brightness-75"
            priority
          />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Welcome to <span className="text-green-400">WeSticker</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mb-6 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Add personality to everything — click the <span className="font-bold">+</span> on a sticker
            to add it to your cart, then review and place your order.
          </motion.p>
          <motion.a
            href="#stickers"
            whileHover={{ scale: 1.03 }}
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            Browse Stickers
          </motion.a>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-10 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold text-green-700 mb-3">How to Order</h2>
          <p className="text-gray-700">
            Browse categories, click <span className="font-bold">“+”</span> to add stickers to your cart,
            and <span className="font-bold">“×”</span> to remove them. When you’re ready, proceed to the
            Order page to confirm and place your order easily.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-10 bg-gray-50" id="stickers">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose a Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
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

        {/* Sticker Grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredStickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                whileHover={{ scale: 1.04 }}
                className="relative bg-white rounded-2xl shadow p-4 flex flex-col items-center transition"
              >
                {/* Add / Remove Button */}
                <button
                  onClick={() => toggleCart(sticker)}
                  className={`absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full text-xl font-bold shadow z-10 transition-colors
                    ${isInCart(sticker)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"}
                  `}
                >
                  {isInCart(sticker) ? "×" : "+"}
                </button>

                <div className="relative w-32 h-32 mb-3">
                  <Image
                    src={sticker.image}
                    alt={sticker.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <h3 className="text-sm font-semibold text-center">{sticker.title}</h3>
                <p className="text-xs text-gray-500">{sticker.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-wrap gap-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="relative bg-white shadow p-3 rounded-lg flex flex-col items-center gap-2 w-40"
                >
                  <div className="relative w-32 h-32">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" />
                  </div>
                  <span className="font-medium text-center text-sm">{item.title}</span>

                  <button
                    onClick={() => toggleCart(item)}
                    className="absolute top-0 right-0 -mt-2 -mr-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full shadow text-sm hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

    </main>
  );
}
