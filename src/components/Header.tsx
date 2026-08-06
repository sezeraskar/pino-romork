"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { asset } from "@/lib/asset";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label="Pino Römork ana sayfa">
          <Image
            src={asset("/images/logo.png")}
            alt="Pino Römork"
            width={286}
            height={107}
            className="brand-logo"
            priority
          />
          <span className="brand-word">Pino Römork</span>
        </Link>

        <nav className="nav-links" aria-label="Ana menü">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
