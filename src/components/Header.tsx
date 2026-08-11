"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

type NavItem = { label: string; href: string };

export default function Header({ nav }: { nav: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
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

          <button
            className="menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={open}
          >
            <span className="menu-lines">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-text">Menü</span>
          </button>
        </div>
      </header>

      {/* Yan menü */}
      <div
        className={`side-overlay ${open ? "show" : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside className={`side-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="side-drawer-head">
          <span className="brand-mark">
            PINO<b>.</b>RÖMORK
          </span>
          <button className="side-close" onClick={close} aria-label="Menüyü kapat">
            ×
          </button>
        </div>
        <nav className="side-nav" aria-label="Ana menü">
          <Link href="/" onClick={close}>Ana Sayfa</Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="side-cta">
          <Link href="/iletisim" className="btn" onClick={close}>
            Teklif Alın
          </Link>
        </div>
      </aside>
    </>
  );
}
