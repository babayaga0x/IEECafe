import "./globals.css";
import "../components/Header.css";
import { Jost } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const jost = Jost({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  fallback: ["Arial", "sans-serif"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={jost.variable}>
      <body className={jost.className}>
        <div className="app-wrapper">
          <CartProvider>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
