import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">МВЕКафе</h3>
            <p className="footer-text">
              Вкусная и свежая еда для студентов и преподавателей. Заказывайте
              онлайн и забирайте в удобное время.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Быстрые ссылки</h3>
            <ul className="footer-links">
              <li>
                <Link href="/menu">Меню</Link>
              </li>
              <li>
                <Link href="/orders">Мои заказы</Link>
              </li>
              <li>
                <Link href="/about">О нас</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Режим работы</h3>
            <ul className="working-hours">
              <li>Понедельник - Пятница</li>
              <li className="hours-time">9:00 - 18:00</li>
              <li className="hours-day">Суббота: Выходной</li>
              <li className="hours-day">Воскресенье: Выходной</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Контакты</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <Phone size={16} />
                <span>8 (800) 100-77-24</span>
              </li>
              <li className="contact-item">
                <Mail size={16} />
                <span>mvekafe@mveu.ru</span>
              </li>
              <li className="contact-item">
                <MapPin size={16} />
                <span>
                  Удмуртская Республика, Ижевск, Пушкинская улица, 268Ж
                </span>
              </li>
            </ul>

            <div className="social-links">
              <a href="https://t.me/mveu_ru" aria-label="Telegram">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@MVEUtv" aria-label="Youtube">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Международный Восточно-Европейский
            Университет
          </p>
        </div>
      </div>
    </footer>
  );
}
