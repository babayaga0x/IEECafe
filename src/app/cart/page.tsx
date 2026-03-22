"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import "./cart.css";

export default function CartPage() {
  const {
    cart,
    loading,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="cart-container">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Cart is empty</h2>
          <p>Add products from the menu</p>
          <Link href="/menu" className="btn-primary">
            Go to menu
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (
    itemId: number | string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemove = (itemId: number | string) => {
    if (confirm("Remove item from cart?")) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => {
            const itemKey = item.id || item.product_id;
            return (
              <div key={itemKey} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price}$</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(itemKey, item.quantity - 1)
                    }
                    className="btn-qty"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(itemKey, item.quantity + 1)
                    }
                    className="btn-qty"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="cart-item-total">
                  <span>{item.price * item.quantity}$</span>
                </div>
                <button
                  onClick={() => handleRemove(itemKey)}
                  className="btn-remove"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Total</h2>
          <div className="summary-row">
            <span>Items:</span>
            <span>{getTotalItems()} pcs.</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{getTotalPrice()}$</span>
          </div>

          <button className="btn-checkout" onClick={() => setIsModalOpen(true)}>
            Place your order
          </button>

          <Link href="/menu" className="btn-continue">
            Continue shopping
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>Pay for order</h2>

            <div className="modal-content">
              <h3>Pay by card</h3>
              <input type="text" placeholder="Card number" />
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVC" />

              <h3>Or cryptocurrency</h3>
              <select>
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>USDT</option>
              </select>
              <select>
                <option>BTC</option>
                <option>ERC-20</option>
                <option>TRC-20</option>
              </select>
              <input type="text" placeholder="Wallet Address" />

              <button className="btn-pay">Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
