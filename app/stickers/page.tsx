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

export default function StickersPage() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<Sticker[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["Animals", "Spiritual", "Sports", "Funny", "Cool"];

  const stickers: Sticker[] = [
    // Animals
    { id: 1, title: "", category: "Animals", image: "/animal/animal_1.jpg" },
    { id: 2, title: "", category: "Animals", image: "/animal/animal_2.jpg" },
    { id: 3, title: "", category: "Animals", image: "/animal/animal_3.jpg" },
    { id: 4, title: "", category: "Animals", image: "/animal/animal_4.jpg" },
    { id: 5, title: "", category: "Animals", image: "/animal/animal_5.jpg" },
    { id: 6, title: "", category: "Animals", image: "/animal/animal_6.jpg" },
    { id: 7, title: "", category: "Animals", image: "/animal/animal_7.jpg" },
    { id: 8, title: "", category: "Animals", image: "/animal/animal_8.jpg" },
    { id: 9, title: "", category: "Animals", image: "https://images.pexels.com/photos/104827/cute-animal-pet-hamster-104827.jpeg?w=600" },
    { id: 10, title: "", category: "Animals", image: "https://images.pexels.com/photos/45170/pexels-photo-45170.jpeg?w=600" },
    { id: 11, title: "", category: "Animals", image: "https://images.pexels.com/photos/46182/pexels-photo-46182.jpeg?w=600" },
    { id: 12, title: "", category: "Animals", image: "https://images.pexels.com/photos/1459396/pexels-photo-1459396.jpeg?w=600" },

    // Spiritual
    { id: 13, title: "", category: "Spiritual", image: "/spiritual/spiritual_1.jpg" },
    { id: 14, title: "", category: "Spiritual", image: "/spiritual/spiritual_2.jpg" },
    { id: 15, title: "", category: "Spiritual", image: "/spiritual/spiritual_3.jpg" },
    { id: 16, title: "", category: "Spiritual", image: "/spiritual/spiritual_4.jpg" },
    { id: 17, title: "", category: "Spiritual", image: "/spiritual/spiritual_5.jpg" },
    { id: 18, title: "", category: "Spiritual", image: "/spiritual/spiritual_6.jpg" },
    { id: 19, title: "", category: "Spiritual", image: "/spiritual/spiritual_7.jpg" },
    { id: 20, title: "", category: "Spiritual", image: "/spiritual/spiritual_8.jpg" },
    { id: 21, title: "", category: "Spiritual", image: "/spiritual/spiritual_9.jpg" },
    { id: 22, title: "", category: "Spiritual", image: "https://images.pexels.com/photos/3822626/pexels-photo-3822626.jpeg?w=600" },
    { id: 23, title: "", category: "Spiritual", image: "https://images.pexels.com/photos/3822627/pexels-photo-3822627.jpeg?w=600" },
    { id: 24, title: "", category: "Spiritual", image: "https://images.pexels.com/photos/3822628/pexels-photo-3822628.jpeg?w=600" },

    // Sports
    { id: 25, title: "", category: "Sports", image: "/sport/sport_1.jpg" },
    { id: 26, title: "", category: "Sports", image: "/sport/sport_2.jpg" },
    { id: 27, title: "", category: "Sports", image: "/sport/sport_3.jpg" },
    { id: 28, title: "", category: "Sports", image: "/sport/sport_4.jpg" },
    { id: 29, title: "", category: "Sports", image: "/sport/sport_5.jpg" },
    { id: 30, title: "", category: "Sports", image: "/sport/sport_6.jpg" },
    { id: 31, title: "", category: "Sports", image: "/sport/sport_7.jpg" },
    { id: 32, title: "", category: "Sports", image: "/sport/sport_8.jpg" },
    { id: 33, title: "", category: "Sports", image: "https://images.pexels.com/photos/114300/pexels-photo-114300.jpeg?w=600" },
    { id: 34, title: "", category: "Sports", image: "https://images.pexels.com/photos/114301/pexels-photo-114301.jpeg?w=600" },
    { id: 35, title: "", category: "Sports", image: "https://images.pexels.com/photos/114302/pexels-photo-114302.jpeg?w=600" },
    { id: 36, title: "", category: "Sports", image: "https://images.pexels.com/photos/114303/pexels-photo-114303.jpeg?w=600" },

    // Funny
    { id: 37, title: "", category: "Funny", image: "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?w=600" },
    { id: 38, title: "", category: "Funny", image: "https://images.pexels.com/photos/208349/pexels-photo-208349.jpeg?w=600" },
    { id: 39, title: "", category: "Funny", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=600" },
    { id: 40, title: "", category: "Funny", image: "https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg?w=600" },
    { id: 41, title: "", category: "Funny", image: "https://images.pexels.com/photos/3822640/pexels-photo-3822640.jpeg?w=600" },
    { id: 42, title: "", category: "Funny", image: "https://images.pexels.com/photos/3822641/pexels-photo-3822641.jpeg?w=600" },
    { id: 43, title: "", category: "Funny", image: "https://images.pexels.com/photos/3822642/pexels-photo-3822642.jpeg?w=600" },
    { id: 44, title: "", category: "Funny", image: "https://images.pexels.com/photos/3822643/pexels-photo-3822643.jpeg?w=600" },

    // Cool
    { id: 45, title: "Sunglasses 1", category: "Cool", image: "https://images.pexels.com/photos/302083/pexels-photo-302083.jpeg?w=600" },
    { id: 46, title: "Sunglasses 2", category: "Cool", image: "https://images.pexels.com/photos/302084/pexels-photo-302084.jpeg?w=600" },
    { id: 47, title: "Cool Hat 1", category: "Cool", image: "https://images.pexels.com/photos/302085/pexels-photo-302085.jpeg?w=600" },
    { id: 48, title: "Cool Hat 2", category: "Cool", image: "https://images.pexels.com/photos/302086/pexels-photo-302086.jpeg?w=600" },
    { id: 49, title: "Cool Car 1", category: "Cool", image: "https://images.pexels.com/photos/302087/pexels-photo-302087.jpeg?w=600" },
    { id: 50, title: "Cool Car 2", category: "Cool", image: "https://images.pexels.com/photos/302088/pexels-photo-302088.jpeg?w=600" },
    { id: 51, title: "Cool Cat 1", category: "Cool", image: "https://images.pexels.com/photos/302089/pexels-photo-302089.jpeg?w=600" },
    { id: 52, title: "Cool Cat 2", category: "Cool", image: "https://images.pexels.com/photos/302090/pexels-photo-302090.jpeg?w=600" },
  ];

  const toggleCart = (sticker: Sticker) => {
    if (cart.some((s) => s.id === sticker.id)) setCart(cart.filter((s) => s.id !== sticker.id));
    else setCart([...cart, sticker]);
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
                        onClick={() => toggleCart(sticker)}
                        className={`absolute top-2 right-2 w-8 h-8 text-xl rounded-full ${
                          inCart ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        }`}
                      >
                        {inCart ? "×" : "+"}
                      </button>

                      <div className="relative w-32 h-32 mx-auto">
                        <Image
                          src={sticker.image}
                          alt={sticker.title}
                          fill
                          className="object-contain rounded-lg bg-white"
                        />
                      </div>

                      <h3 className="mt-3 font-semibold">{sticker.title}</h3>
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
