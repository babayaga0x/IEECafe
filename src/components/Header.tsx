"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import "./Header.css";

export default function Header() {
  const router = useRouter();
  const { getTotalItems } = useCart();

  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/users/me");

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.log("Not authorized");
        setUser(null);
      }
    } catch (error) {
      console.error("Err check auth:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
      });

      setUser(null);
      setShowUserMenu(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error auth:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link href="/menu" className="logo">
            <div className="logo-icon">
              <Image
                src="/Logo.png"
                alt="MVECafe"
                width={48}
                height={48}
                priority
              />
            </div>
            <span className="logo-text">MVECafe</span>
          </Link>

          <nav className="nav">
            <button onClick={() => router.push("/menu")}>Menu</button>
            {user?.role === "admin" && (
              <button className="order" onClick={() => router.push("/admin")}>
                All supplies
              </button>
            )}
            <button onClick={() => router.push("/about")}>About</button>
          </nav>

          <div className="header-actions">
            <Link href="/cart" className="icon-button cart-button">
              <ShoppingCart size={24} />
              <span className="cart-badge">{getTotalItems()}</span>
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <div className="user-menu-wrapper">
                    <button
                      className="icon-button"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      <User size={24} />
                    </button>

                    {showUserMenu && (
                      <div className="user-dropdown">
                        <div className="user-info">
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>

                        <div className="dropdown-divider"></div>

                        <button
                          className="logout-button"
                          onClick={handleLogout}
                        >
                          <LogOut size={18} />
                          <span>Exit</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/profile" className="icon-button">
                    <User size={24} />
                  </Link>
                )}
              </>
            )}

            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <nav className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <button
          onClick={() => {
            router.push("/menu");
            setIsMobileMenuOpen(false);
          }}
        >
          Menu
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => {
              router.push("/admin");
              setIsMobileMenuOpen(false);
            }}
          >
            All supplies
          </button>
        )}

        <button
          onClick={() => {
            router.push("/about");
            setIsMobileMenuOpen(false);
          }}
        >
          About Us
        </button>
      </nav>
    </header>
  );
}
