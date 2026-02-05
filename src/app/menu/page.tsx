"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { Product } from "@/lib/product";
import CookieBanner from "@/components/CookieBanner";
import "./menu.css";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API didnt return arrow", data);
        }
      });
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Меню МВЕКафе</h1>
      <ProductList products={products} />
      <CookieBanner />
    </div>
  );
}
