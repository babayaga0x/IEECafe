import { Product } from "@/lib/product";
import "./ProductCard.css";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price} руб</p>
    </div>
  );
}
