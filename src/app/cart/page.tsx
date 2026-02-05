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
        <p>Загрузка корзины...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из меню</p>
          <Link href="/menu" className="btn-primary">
            Перейти в меню
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
    if (confirm("Удалить товар из корзины?")) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Корзина</h1>
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
                  <p className="cart-item-price">{item.price}₽</p>
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
                  <span>{item.price * item.quantity}₽</span>
                </div>
                <button
                  onClick={() => handleRemove(itemKey)}
                  className="btn-remove"
                  title="Удалить"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Итого</h2>
          <div className="summary-row">
            <span>Товаров:</span>
            <span>{getTotalItems()} шт.</span>
          </div>
          <div className="summary-row total">
            <span>Сумма:</span>
            <span>{getTotalPrice()}₽</span>
          </div>

          <button className="btn-checkout" onClick={() => setIsModalOpen(true)}>
            Оформить заказ
          </button>

          <Link href="/menu" className="btn-continue">
            Продолжить покупки
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
            <h2>Оплата заказа</h2>

            <div className="modal-content">
              <h3>Оплата картой</h3>
              <input type="text" placeholder="Номер карты" />
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVC" />

              <h3>Или криптовалютой</h3>
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
              <input type="text" placeholder="Адрес Кошелька" />

              <button className="btn-pay">Оплатить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
