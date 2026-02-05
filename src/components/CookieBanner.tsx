"use client";

import { useState } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Наша платформа использует файлы Cookies для лучшей работы сервиса
      </p>
      <button className="cookie-button" onClick={() => setVisible(false)}>
        Принять
      </button>
    </div>
  );
}
