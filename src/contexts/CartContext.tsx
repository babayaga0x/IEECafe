"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id?: number;
  product_id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  isAuthenticated: boolean;
  addToCart: (product: Omit<CartItem, "quantity" | "id">) => Promise<void>;
  removeFromCart: (itemId: number | string) => Promise<void>;
  updateQuantity: (itemId: number | string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCartOnLogin: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/users/me");
      if (response.ok) {
        setIsAuthenticated(true);
        await loadCartFromDB();
      } else {
        setIsAuthenticated(false);
        loadCartFromLocalStorage();
      }
    } catch (error) {
      setIsAuthenticated(false);
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Загрузка из localStorage (для неавторизованных)
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  // Загрузка из БД (для авторизованных)
  const loadCartFromDB = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setCart(data.cartItems || []);
      }
    } catch (error) {
      console.error("Ошибка загрузки корзины из БД:", error);
    }
  };

  // Сохранение в localStorage
  const saveToLocalStorage = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Синхронизация при входе (объединение localStorage с БД)
  const syncCartOnLogin = async () => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const items: CartItem[] = JSON.parse(localCart);

      // Добавляем товары из localStorage в БД
      for (const item of items) {
        try {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: item.product_id }),
          });
        } catch (error) {
          console.error("Ошибка синхронизации:", error);
        }
      }

      // Очищаем localStorage
      localStorage.removeItem("cart");
    }

    setIsAuthenticated(true);
    await loadCartFromDB();
  };

  // Добавить товар в корзину
  const addToCart = async (product: Omit<CartItem, "quantity" | "id">) => {
    if (isAuthenticated) {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.product_id }),
        });

        if (response.ok) {
          await loadCartFromDB();
        } else {
          const data = await response.json();
          alert(data.error || "Ошибка добавления в корзину");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка добавления в корзину");
      }
    } else {
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.product_id === product.product_id,
        );

        let newCart;
        if (existing) {
          newCart = prev.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          newCart = [...prev, { ...product, quantity: 1 }];
        }

        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const removeFromCart = async (itemId: number | string) => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`/api/cart/${itemId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await loadCartFromDB();
        }
      } catch (error) {
        console.error("Ошибка удаления:", error);
      }
    } else {
      setCart((prev) => {
        const newCart = prev.filter((item) => item.product_id !== itemId);
        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const updateQuantity = async (itemId: number | string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    if (isAuthenticated) {
      try {
        const response = await fetch(`/api/cart/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });

        if (response.ok) {
          await loadCartFromDB();
        }
      } catch (error) {
        console.error("Ошибка обновления:", error);
      }
    } else {
      setCart((prev) => {
        const newCart = prev.map((item) =>
          item.product_id === itemId ? { ...item, quantity } : item,
        );
        saveToLocalStorage(newCart);
        return newCart;
      });
    }
  };

  const clearCart = async () => {
    setCart([]);

    if (isAuthenticated) {
      try {
        const response = await fetch("/api/cart/clear", {
          method: "DELETE",
        });

        if (!response.ok) {
          console.log("Не удалось очитстить корзину");
        }
      } catch (error) {
        console.error("Ошибка при очистке:", error);
      }
    } else {
      localStorage.removeItem("cart");
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Общая стоимость
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        syncCartOnLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

