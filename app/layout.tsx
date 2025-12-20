import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Stickerbet",
  description: "Your favorite custom sticker shop!",
  icons: {
    icon: "/dog.jpg",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-app",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-stone-50">
      <body
        className={`${poppins.variable} font-sans bg-gradient-to-b from-[#eef2ff] via-white to-[#f5f3ff] text-slate-800 antialiased`}
      >
        <div className="relative min-h-screen">
          <div className="pointer-events-none fixed inset-0 opacity-70 mix-blend-overlay blur-3xl"></div>
          <main className="relative z-10">{children}</main>
          <footer className="relative z-10 mt-16 border-t border-indigo-100 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-sm text-gray-500 md:flex-row md:justify-between">
              <p>© {new Date().getFullYear()} Stickerbet — Crafted with care.</p>
              <div className="flex gap-4 text-xs uppercase tracking-[0.2em] text-gray-400">

              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
