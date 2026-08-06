"use client";

import { useState, type FormEvent } from "react";
import { categories, site } from "@/lib/content";
import { ArrowRight } from "./icons";

const WA_PHONE = "905412577792";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    eposta: "",
    konu: categories[0]?.fullTitle ?? "Genel",
    mesaj: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function buildMessage() {
    return (
      `Merhaba, ben ${form.ad || "—"}.\n` +
      `Konu: ${form.konu}\n` +
      `Telefon: ${form.telefon || "—"}\n` +
      `E-posta: ${form.eposta || "—"}\n` +
      `Mesaj: ${form.mesaj || "—"}`
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage());
    window.open(
      `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  function mailto() {
    const subject = encodeURIComponent(`Teklif talebi — ${form.konu}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Ad Soyad *</span>
          <input
            type="text"
            required
            value={form.ad}
            onChange={set("ad")}
            placeholder="Adınız Soyadınız"
          />
        </label>
        <label className="field">
          <span>Telefon *</span>
          <input
            type="tel"
            required
            value={form.telefon}
            onChange={set("telefon")}
            placeholder="05xx xxx xx xx"
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>E-posta</span>
          <input
            type="email"
            value={form.eposta}
            onChange={set("eposta")}
            placeholder="ornek@eposta.com"
          />
        </label>
        <label className="field">
          <span>İlgilendiğiniz ürün</span>
          <select value={form.konu} onChange={set("konu")}>
            {categories.map((c) => (
              <option key={c.slug} value={c.fullTitle}>
                {c.fullTitle}
              </option>
            ))}
            <option value="Çeki Demiri">Çeki Demiri</option>
            <option value="Karavan">Karavan</option>
            <option value="Proje Geliştirme">Proje Geliştirme</option>
            <option value="Genel / Diğer">Genel / Diğer</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Mesajınız</span>
        <textarea
          rows={5}
          value={form.mesaj}
          onChange={set("mesaj")}
          placeholder="İhtiyacınızı kısaca anlatın; en uygun çözümü hazırlayalım."
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn">
          WhatsApp&apos;tan gönder
          <ArrowRight />
        </button>
        <button type="button" className="btn ghost" onClick={mailto}>
          E-posta ile gönder
        </button>
      </div>

      {sent && (
        <p className="form-note" role="status">
          WhatsApp penceresi açıldı. Açılmadıysa{" "}
          <a href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}>
            {site.phonePrimary}
          </a>{" "}
          numaramızdan bize ulaşabilirsiniz.
        </p>
      )}
    </form>
  );
}
