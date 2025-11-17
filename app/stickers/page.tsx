"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Sticker {
  id: number;
  title: string;
  category: string;
  image: string;
  size?: string;
}

export default function StickersPage() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<Sticker[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [showSizeMenu, setShowSizeMenu] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["Animals", "Spiritual", "Sports", "Tech", "Cool"];

  const stickers: Sticker[] = [
    // Animals (12)
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

    // Spiritual (12)
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

    // Sports (12)
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

    // Tech (7)
    { id: 38, title: "Tech 1", category: "Tech", image: "/tech/tech_1.jpg" },
    { id: 39, title: "Tech 2", category: "Tech", image: "/tech/tech_2.jpg" },
    { id: 40, title: "Tech 3", category: "Tech", image: "/tech/tech_3.jpg" },
    { id: 41, title: "Tech 4", category: "Tech", image: "/tech/tech_4.jpg" },
    { id: 42, title: "Tech 5", category: "Tech", image: "/tech/tech_5.jpg" },
    { id: 43, title: "Tech 6", category: "Tech", image: "/tech/tech_6.jpg" },
    { id: 44, title: "Tech 7", category: "Tech", image: "/tech/tech_7.jpg" },

    // Cool (8)
    { id: 45, title: "Sunglasses 1", category: "Cool", image: "https://images.pexels.com/photos/302083/pexels-photo-302083.jpeg?w=600" },
    { id: 46, title: "Sunglasses 2", category: "Cool", image: "https://images.pexels.com/photos/302084/pexels-photo-302084.jpeg?w=600" },
    { id: 47, title: "Cool Hat 1", category: "Cool", image: "https://images.pexels.com/photos/302085/pexels-photo-302085.jpeg?w=600" },
    { id: 48, title: "Cool Hat 2", category: "Cool", image: "https://images.pexels.com/photos/302086/pexels-photo-302086.jpeg?w=600" },
    { id: 49, title: "Cool Car 1", category: "Cool", image: "https://images.pexels.com/photos/302087/pexels-photo-302087.jpeg?w=600" },
    { id: 50, title: "Cool Car 2", category: "Cool", image: "https://images.pexels.com/photos/302088/pexels-photo-302088.jpeg?w=600" },
    { id: 51, title: "Cool Cat 1", category: "Cool", image: "https://images.pexels.com/photos/302089/pexels-photo-302089.jpeg?w=600" },
    { id: 52, title: "Cool Cat 2", category: "Cool", image: "https://images.pexels.com/photos/302090/pexels-photo-302090.jpeg?w=600" },
  ];

  const addToCartWithSize = (sticker: Sticker, size: string) => {
    // prevent adding duplicate same sticker (single entry per sticker id)
    if (cart.some((s) => s.id === sticker.id)) {
      // if exists, replace size
      setCart((prev) => prev.map((s) => (s.id === sticker.id ? { ...s, size } : s)));
    } else {
      setCart((prev) => [...prev, { ...sticker, size }]);
    }
    setShowSizeMenu(null);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((s) => s.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-white min-h-screen text-gray-800 scroll-smooth">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src="/animal/animal_5.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              WeSticker
            </h1>
          </div>

          <div className="hidden md:flex gap-6 text-sm font-semibold">
            <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
            <a href="/#how" className="text-gray-700 hover:text-green-600">Order</a>
            <a href="/#pricing" className="text-gray-700 hover:text-green-600">Pricing</a>
            <a href="/#contact" className="text-gray-700 hover:text-green-600">Contact</a>
            <a href="/stickers" className="text-green-600">Stickers</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md"
          >
            Cart ({cart.length})
          </motion.button>
        </div>
      </motion.nav>

      {/* PAGE CONTENT */}
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-700">Browse Stickers</h1>

        {/* Centered Category Navbar */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat)}
              className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-green-500 hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Sections */}
        {categories.map((cat) => {
          const catStickers = stickers.filter((s) => s.category === cat);
          const showAll = expanded[cat] || false;
          const stickersToShow = showAll ? catStickers : catStickers.slice(0, 8);

          return (
            <section key={cat} id={cat} className="mb-16">
              <div className="flex justify-center mb-6">
                <h2 className="text-3xl font-semibold text-green-600">{cat}</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {stickersToShow.map((sticker) => {
                  const inCart = cart.some((s) => s.id === sticker.id);
                  return (
                    <motion.div
                      key={sticker.id}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-white p-4 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.05)] text-center"
                    >
                      <button
                        onClick={() => {
                          if (inCart) removeFromCart(sticker.id);
                          else setShowSizeMenu((id) => (id === sticker.id ? null : sticker.id));
                        }}
                        className={`absolute top-2 right-2 w-8 h-8 text-xl rounded-full ${
                          inCart ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        } flex items-center justify-center`}
                        aria-label={inCart ? "Remove from cart" : "Add to cart / choose size"}
                      >
                        {inCart ? "×" : "+"}
                      </button>

                      {/* Size Dropdown */}
                      <AnimatePresence>
                        {showSizeMenu === sticker.id && !inCart && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-3 top-12 bg-white shadow-lg p-2 rounded-xl border text-sm z-20 w-36"
                          >
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-green-50 rounded"
                              onClick={() => addToCartWithSize(sticker, "Small (5 cm)")}
                            >
                              Small (5 cm)
                            </button>
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-green-50 rounded"
                              onClick={() => addToCartWithSize(sticker, "Medium (8 cm)")}
                            >
                              Medium (8 cm)
                            </button>
                            <button
                              className="block w-full text-left px-3 py-2 hover:bg-green-50 rounded"
                              onClick={() => addToCartWithSize(sticker, "Large (12 cm)")}
                            >
                              Large (12 cm)
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative w-32 h-32 mx-auto">
                        <Image
                          src={sticker.image}
                          alt={sticker.title || `${sticker.category} sticker`}
                          fill
                          className="object-contain rounded-lg bg-white"
                        />
                      </div>

                      <h3 className="mt-3 font-semibold">{sticker.title || `${sticker.category} sticker`}</h3>
                      {inCart && (
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {cart.find((s) => s.id === sticker.id)?.size}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {catStickers.length > 8 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }))}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition"
                  >
                    {showAll ? "See Less" : "See More"}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
