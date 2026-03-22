"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Admin.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== "admin") {
          router.replace("/login");
        } else {
          setIsAdmin(true);
          setLoading(false);
        }
      });
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [isAdmin]);

  const addProduct = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);

    await fetch("/api/admin/addProduct", {
      method: "POST",
      body: formData,
    });

    setName("");
    setPrice("");
    setImageFile(null);

    refreshProducts();
  };

  const deleteProduct = async (id: number) => {
    await fetch("/api/admin/deleteProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refreshProducts();
  };

  const refreshProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <h2>Add Product</h2>
      <div className="admin-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) setImageFile(e.target.files[0]);
          }}
        />
        <button onClick={addProduct}>Add</button>
      </div>

      <h2>List products</h2>
      <div className="products-list">
        {products.map((p) => (
          <div key={p.id} className="product-row">
            <span className="product-name">{p.name}</span>
            <span className="product-price">{p.price} $</span>
            <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
