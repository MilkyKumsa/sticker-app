"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Sticker {
  id: number;
  title: string;
  category: string;
  image: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Sticker[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["hero", "how", "pricing", "contact", "stickers"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["All", "Animals", "Spiritual", "Sports", "Funny", "Cool"];
  const stickers: Sticker[] = [
    {
      id: 1,
      title: "Cute Dog",
      category: "Animals",
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Meditation Lotus",
      category: "Spiritual",
      image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Football Player",
      category: "Sports",
      image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title: "Laughing Emoji",
      category: "Funny",
      image: "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      title: "Cool Sunglasses",
      category: "Cool",
      image: "https://images.pexels.com/photos/1204360/pexels-photo-1204360.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const filteredStickers =
    activeCategory === "All"
      ? stickers
      : stickers.filter((s) => s.category === activeCategory);

  const isInCart = (sticker: Sticker) => cart.some((item) => item.id === sticker.id);
  const toggleCart = (sticker: Sticker) => {
    if (isInCart(sticker)) setCart(cart.filter((item) => item.id !== sticker.id));
    else setCart([...cart, sticker]);
  };

  return (
    <main className="bg-white text-gray-800 scroll-smooth">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Image src="/img1.jpg" alt="WeSticker Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              WeSticker
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-semibold">
            {[
              { id: "hero", label: "Home" },
              { id: "how", label: "Order" },
              { id: "pricing", label: "Pricing" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative transition duration-300 hover:text-green-600 ${
                  activeSection === id ? "text-green-600" : "text-gray-700"
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md"
          >
            Cart
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section id="hero" className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image src="/img1.jpg" alt="Hero Background" fill className="object-cover brightness-75" priority />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            Welcome to <span className="text-green-400">WeSticker</span>
          </motion.h1>
          <p className="mb-6 text-base sm:text-lg max-w-2xl mx-auto">
            Personalize your world — choose your favorite stickers and express yourself!
          </p>
          <motion.a
            href="#stickers"
            whileHover={{ scale: 1.03 }}
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            Browse Stickers
          </motion.a>
        </div>
      </section>

      {/* How to Order */}
      <section id="how" className="py-16 bg-green-50 text-center px-6">
        <h2 className="text-3xl font-bold text-green-700 mb-4">How to Order</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          Click the <span className="font-bold">“+”</span> on any sticker to add it to your cart.
          Use the <span className="font-bold">“×”</span> to remove it.
          Scroll down to review your selection, then proceed to checkout.
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-green-700 mb-8">Pricing</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { title: "Basic", price: "$5", desc: "Any 5 stickers of your choice" },
            { title: "Premium", price: "$9", desc: "Any 12 stickers + 1 free" },
            { title: "Deluxe", price: "$15", desc: "All categories + priority delivery" },
          ].map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 border border-green-300 rounded-2xl shadow p-6 w-64"
            >
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-2xl text-green-600 font-extrabold mb-3">{plan.price}</p>
              <p className="text-gray-600 mb-4">{plan.desc}</p>
              <button className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-green-50 text-center px-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Contact Us</h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          Have questions or need a custom order? Reach out and we'll be happy to help.
        </p>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 focus:ring-2 focus:ring-green-400"
          ></textarea>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
            Send Message
          </button>
        </form>
      </section>

      {/* Stickers Section */}
      <section id="stickers" className="py-16 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Choose Stickers</h2>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 md:px-20">
          {filteredStickers.map((sticker) => (
            <motion.div
              key={sticker.id}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg"
            >
              <button
                onClick={() => toggleCart(sticker)}
                className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-lg z-10 transition-colors
                  ${isInCart(sticker) ? "bg-red-500 text-white" : "bg-green-500 text-white"}
                `}
              >
                {isInCart(sticker) ? "×" : "+"}
              </button>

              <div className="relative w-32 h-32 mb-4">
                <Image src={sticker.image} alt={sticker.title} fill className="object-contain bg-white p-2 rounded-lg" />
              </div>
              <h3 className="text-lg font-semibold">{sticker.title}</h3>
              <p className="text-sm text-gray-500">{sticker.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-6 mt-12">
        <p>© {new Date().getFullYear()} WeSticker. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
