"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Sticker {
  id: number;
  title: string;
  category: string;
  image: string;
  size?: string;
}

export default function StickersPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<Sticker[]>([]);
  const [showSizeMenu, setShowSizeMenu] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stickersCart");
      if (saved) setCart(JSON.parse(saved));
    }
  }, []);

  const updateCartState = (updater: (prev: Sticker[]) => Sticker[]) => {
    setCart((prev) => {
      const next = updater(prev);
      if (typeof window !== "undefined") {
        localStorage.setItem("stickersCart", JSON.stringify(next));
      }
      return next;
    });
  };

  const addToCartWithSize = (sticker: Sticker, size: string) => {
    updateCartState((prev) => {
      if (prev.some((s) => s.id === sticker.id)) {
        return prev.map((s) => (s.id === sticker.id ? { ...s, size } : s));
      }
      return [...prev, { ...sticker, size }];
    });
    setShowSizeMenu(null);
  };

  const removeFromCart = (id: number) => {
    updateCartState((prev) => prev.filter((s) => s.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categories = ["Animals", "Spiritual", "Sports", "Tech", "Cool"];

  // FULL sticker dataset
  const stickers: Sticker[] = [
    { id: 1, title: "Cute Dog 1", category: "Animals", image: "/animal/animal_1.jpg" },
    { id: 2, title: "Cute Dog 2", category: "Animals", image: "/animal/animal_2.jpg" },
    { id: 3, title: "Cat 1", category: "Animals", image: "/animal/animal_3.jpg" },
    { id: 4, title: "Cat 2", category: "Animals", image: "/animal/animal_4.jpg" },
    { id: 5, title: "Rabbit 1", category: "Animals", image: "/animal/animal_5.jpg" },
    { id: 6, title: "Rabbit 2", category: "Animals", image: "/animal/animal_6.jpg" },
    { id: 7, title: "Parrot 1", category: "Animals", image: "/animal/animal_7.jpg" },
    { id: 8, title: "Parrot 2", category: "Animals", image: "/animal/animal_8.jpg" },
    { id: 9, title: "Hamster 1", category: "Animals", image: "https://images.pexels.com/photos/104827/cute-animal-pet-hamster-104827.jpeg?w=600" },
    { id: 10, title: "Hamster 2", category: "Animals", image: "https://images.pexels.com/photos/45170/pexels-photo-45170.jpeg?w=600" },
    { id: 11, title: "Turtle 1", category: "Animals", image: "https://images.pexels.com/photos/46182/pexels-photo-46182.jpeg?w=600" },
    { id: 12, title: "Turtle 2", category: "Animals", image: "https://images.pexels.com/photos/1459396/pexels-photo-1459396.jpeg?w=600" },

    { id: 13, title: "Meditation 1", category: "Spiritual", image: "/spiritual/spiritual_1.jpg" },
    { id: 14, title: "Meditation 2", category: "Spiritual", image: "/spiritual/spiritual_2.jpg" },
    { id: 15, title: "Lotus 1", category: "Spiritual", image: "/spiritual/spiritual_3.jpg" },
    { id: 16, title: "Lotus 2", category: "Spiritual", image: "/spiritual/spiritual_4.jpg" },
    { id: 17, title: "Zen 1", category: "Spiritual", image: "/spiritual/spiritual_5.jpg" },
    { id: 18, title: "Zen 2", category: "Spiritual", image: "/spiritual/spiritual_6.jpg" },
    { id: 19, title: "Chakra 1", category: "Spiritual", image: "/spiritual/spiritual_7.jpg" },
    { id: 20, title: "Chakra 2", category: "Spiritual", image: "/spiritual/spiritual_8.jpg" },
    { id: 21, title: "Mandala 1", category: "Spiritual", image: "/spiritual/spiritual_9.jpg" },
    { id: 22, title: "Mandala 2", category: "Spiritual", image: "https://images.pexels.com/photos/3822626/pexels-photo-3822626.jpeg?w=600" },
    { id: 23, title: "Prayer Beads 1", category: "Spiritual", image: "https://images.pexels.com/photos/3822627/pexels-photo-3822627.jpeg?w=600" },
    { id: 24, title: "Prayer Beads 2", category: "Spiritual", image: "https://images.pexels.com/photos/3822628/pexels-photo-3822628.jpeg?w=600" },

    { id: 25, title: "Football 1", category: "Sports", image: "/sport/sport_1.jpg" },
    { id: 26, title: "Football 2", category: "Sports", image: "/sport/sport_2.jpg" },
    { id: 27, title: "Basketball 1", category: "Sports", image: "/sport/sport_3.jpg" },
    { id: 28, title: "Basketball 2", category: "Sports", image: "/sport/sport_4.jpg" },
    { id: 29, title: "Tennis 1", category: "Sports", image: "/sport/sport_5.jpg" },
    { id: 30, title: "Tennis 2", category: "Sports", image: "/sport/sport_6.jpg" },
    { id: 31, title: "Soccer 1", category: "Sports", image: "/sport/sport_7.jpg" },
    { id: 32, title: "Soccer 2", category: "Sports", image: "/sport/sport_8.jpg" },
    { id: 33, title: "Hockey 1", category: "Sports", image: "https://images.pexels.com/photos/114300/pexels-photo-114300.jpeg?w=600" },
    { id: 34, title: "Hockey 2", category: "Sports", image: "https://images.pexels.com/photos/114301/pexels-photo-114301.jpeg?w=600" },
    { id: 35, title: "Baseball 1", category: "Sports", image: "https://images.pexels.com/photos/114302/pexels-photo-114302.jpeg?w=600" },
    { id: 36, title: "Baseball 2", category: "Sports", image: "https://images.pexels.com/photos/114303/pexels-photo-114303.jpeg?w=600" },

    { id: 38, title: "Tech 1", category: "Tech", image: "/tech/tech_1.jpg" },
    { id: 39, title: "Tech 2", category: "Tech", image: "/tech/tech_2.jpg" },
    { id: 40, title: "Tech 3", category: "Tech", image: "/tech/tech_3.jpg" },
    { id: 41, title: "Tech 4", category: "Tech", image: "/tech/tech_4.jpg" },
    { id: 42, title: "Tech 5", category: "Tech", image: "/tech/tech_5.jpg" },
    { id: 43, title: "Tech 6", category: "Tech", image: "/tech/tech_6.jpg" },
    { id: 44, title: "Tech 7", category: "Tech", image: "/tech/tech_7.jpg" },

    { id: 45, title: "Sunglasses 1", category: "Cool", image: "https://images.pexels.com/photos/302083/pexels-photo-302083.jpeg?w=600" },
    { id: 46, title: "Sunglasses 2", category: "Cool", image: "https://images.pexels.com/photos/302084/pexels-photo-302084.jpeg?w=600" },
    { id: 47, title: "Cool Hat 1", category: "Cool", image: "https://images.pexels.com/photos/302085/pexels-photo-302085.jpeg?w=600" },
    { id: 48, title: "Cool Hat 2", category: "Cool", image: "https://images.pexels.com/photos/302086/pexels-photo-302086.jpeg?w=600" },
    { id: 49, title: "Cool Car 1", category: "Cool", image: "https://images.pexels.com/photos/302087/pexels-photo-302087.jpeg?w=600" },
    { id: 50, title: "Cool Car 2", category: "Cool", image: "https://images.pexels.com/photos/302088/pexels-photo-302088.jpeg?w=600" },
    { id: 51, title: "Cool Cat 1", category: "Cool", image: "https://images.pexels.com/photos/302089/pexels-photo-302089.jpeg?w=600" },
    { id: 52, title: "Cool Cat 2", category: "Cool", image: "https://images.pexels.com/photos/302090/pexels-photo-302090.jpeg?w=600" },
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-gray-800 scroll-smooth pt-24">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 border border-white/70 shadow-[0_15px_60px_rgba(15,118,110,0.12)] backdrop-blur-xl"
            : "bg-white/40 border border-white/60 shadow-none backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src="/animal/animal_5.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              StickerBet
            </h1>
          </div>

          <div className="flex gap-8 text-sm font-semibold text-gray-700">
            <a href="/" className="hover:text-indigo-500">Home</a>
            <a href="/#how" className="hover:text-indigo-500">Order</a>
            <a href="/#pricing" className="hover:text-indigo-500">Pricing</a>
            <a href="/#contact" className="hover:text-indigo-500">Contact</a>
            <a href="/stickers" className="text-indigo-600">Stickers</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCart(true)}
            className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-indigo-200"
          >
            Cart ({cart.length})
          </motion.button>
        </div>
      </motion.nav>

      {/* STICKERS */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {categories.map((cat) => {
          const catStickers = stickers.filter((s) => s.category === cat);
          if (catStickers.length === 0) return null;

          return (
            <section key={cat} id={cat} className="mb-12">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">{cat}</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {catStickers.map((sticker) => {
                  const inCart = cart.some((s) => s.id === sticker.id);
                  return (
                    <div key={sticker.id} className="relative w-full h-28">
                      <Image
                        src={sticker.image}
                        alt={sticker.title}
                        fill
                        className="object-contain"
                      />
                      <button
                        onClick={() => {
                          if (inCart) removeFromCart(sticker.id);
                          else setShowSizeMenu(sticker.id);
                        }}
                        className={`absolute top-1 right-1 w-7 h-7 text-sm rounded-full flex items-center justify-center shadow ${
                          inCart ? "bg-red-500 text-white" : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                        }`}
                      >
                        {inCart ? "×" : "+"}
                      </button>

                      {/* Size Menu */}
                      <AnimatePresence>
                        {showSizeMenu === sticker.id && !inCart && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-1 top-8 bg-white shadow-xl p-2 rounded-xl border text-sm z-20 w-36"
                          >
                            <button className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded" onClick={() => addToCartWithSize(sticker, "Small (5cm)")}>
                              Small (5 cm)
                            </button>
                            <button className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded" onClick={() => addToCartWithSize(sticker, "Medium (8cm)")}>
                              Medium (8 cm)
                            </button>
                            <button className="block w-full text-left px-2 py-1 hover:bg-indigo-50 rounded" onClick={() => addToCartWithSize(sticker, "Large (12cm)")}>
                              Large (12 cm)
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* CART PANEL */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/70 z-50 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              key="cart-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed bottom-6 right-6 w-full max-w-md rounded-3xl border border-white/60 bg-white/95 shadow-[0_25px_80px_rgba(15,118,110,0.25)] p-6 z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-700">Your Cart</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowCart(false)}>×</button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">No stickers in your cart yet.</p>
              ) : (
                <>
                  <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 border-b pb-3">
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-contain rounded-lg bg-gray-50" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-600 font-semibold">
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-sm transition"
                    onClick={() => {
                      setShowCart(false);
                      router.push("/checkout");
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
