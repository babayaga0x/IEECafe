"use client";

import { Product } from "@/lib/product";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import "./ProductList.css";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <div key={product.id} className="product-card">
          <Image
            src={product.image}
            alt={product.name}
            className="product-img"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : undefined}
            unoptimized={product.image.startsWith("/uploads/")}
          />
          <div className="product-card-content">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Цена: {product.price}₽</p>
          </div>

          {product.id === 1 && (
            <p className="product-description">
              Сэндвич с хрустящим хлебом, свежими овощами и нежным соусом.
            </p>
          )}
          {product.id === 2 && (
            <p className="product-description">
              Свежий салат из сезонных овощей с оливковым маслом и зеленью.
            </p>
          )}
          {product.id === 3 && (
            <p className="product-description">
              Апельсиновый сок, выжатый прямо перед подачей, насыщенный и
              свежий.
            </p>
          )}
          {product.id === 4 && (
            <p className="product-description">
              Мясной суп с ароматными специями и свежей зеленью, как дома.
            </p>
          )}
          {product.id === 5 && (
            <p className="product-description">
              Пельмени с сочной начинкой из мяса, подаются с соевым соусом.
            </p>
          )}
          {product.id === 7 && (
            <p className="product-description">
              Мясные котлеты, приготовленные по классическому рецепту с
              золотистой корочкой.
            </p>
          )}

          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart size={18} />
            <span>В корзину</span>
          </button>
        </div>
      ))}
    </div>
  );
}
