"use client";

import { useState } from "react";
import "./CookieBanner.css";
import Image from "next/image";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <Image
        src="/cookie.svg"
        alt="Cookie"
        width={48}
        height={48}
        priority
      ></Image>
      <p className="cookie-text">
        Our platform uses Cookies to ensure optimal performance. By continuing
        to use the platform, you accept them.
      </p>
      <button className="cookie-button" onClick={() => setVisible(false)}>
        Accept
      </button>
    </div>
  );
}
