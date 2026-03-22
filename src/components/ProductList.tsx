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
            /*unoptimized={product.image.startsWith("/uploads/")}*/
          />
          <div className="product-card-content">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Price: {product.price}$</p>
          </div>

          {product.id === 1 && (
            <p className="product-description">
              A sandwich with crispy bread, fresh vegetables, and a delicate
              sauce.
            </p>
          )}
          {product.id === 2 && (
            <p className="product-description">
              A fresh salad of seasonal vegetables with olive oil and herbs.
            </p>
          )}
          {product.id === 3 && (
            <p className="product-description">
              Orange juice, squeezed just before serving, is rich and fresh.
            </p>
          )}
          {product.id === 4 && (
            <p className="product-description">
              Meat soup with aromatic spices and With fresh herbs, just like
              home.
            </p>
          )}
          {product.id === 5 && (
            <p className="product-description">
              Dumplings with a juicy meat filling, served with soy sauce.
            </p>
          )}
          {product.id === 7 && (
            <p className="product-description">
              Meat patties prepared according to the classic recipe with a
              golden crust.
            </p>
          )}

          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      ))}
    </div>
  );
}
