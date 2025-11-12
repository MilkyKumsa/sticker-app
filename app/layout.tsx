import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "WeSticker",
  description: "Your favorite custom sticker shop!",
  icons: {
    icon: "/dog.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-800">
        {/* 🧭 Navigation Bar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* ✅ Logo Section */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/dog.jpg"
                alt="WeSticker logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-green-700">WeSticker</span>
            </Link>

            {/* ✅ Nav Links */}
            <nav className="flex space-x-6 items-center text-gray-700 font-medium">
              <Link href="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/order" className="hover:text-green-600 transition-colors">
                Order
              </Link>
              <Link href="/pricing" className="hover:text-green-600 transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="hover:text-green-600 transition-colors">
                Contact
              </Link>
              <Link href="/cart" className="hover:text-green-600 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </header>

        {/* 🧩 Page Content */}
        <main>{children}</main>

        {/* 📜 Footer */}
        <footer className="bg-green-700 text-white text-center py-6 mt-16">
          <p>© {new Date().getFullYear()} WeSticker. All rights reserved.</p>
          <p className="text-sm opacity-80">Crafted with ❤️ using Next.js</p>
        </footer>
      </body>
    </html>
  );
}
