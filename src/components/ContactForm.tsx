"use client";

import { useState, type FormEvent } from "react";
import { categories, site } from "@/lib/content";
import { ArrowRight } from "./icons";

const WA_PHONE = "905412577792";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    eposta: "",
    konu: categories[0]?.fullTitle ?? "Genel",
    mesaj: "",
    website: "", // honeypot
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function waMessage() {
    return (
      `Merhaba, ben ${form.ad || "—"}.\n` +
      `Konu: ${form.konu}\n` +
      `Telefon: ${form.telefon || "—"}\n` +
      `E-posta: ${form.eposta || "—"}\n` +
      `Mesaj: ${form.mesaj || "—"}`
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "Gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  function sendWhatsApp() {
    const text = encodeURIComponent(waMessage());
    window.open(
      `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (status === "ok") {
    return (
      <div className="form-success" role="status">
        <div className="form-success-icon">✓</div>
        <h3>Talebiniz alındı</h3>
        <p>
          En kısa sürede size dönüş yapacağız. Acele bir durum varsa{" "}
          <a href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}>
            {site.phonePrimary}
          </a>{" "}
          numaramızdan da ulaşabilirsiniz.
        </p>
      </div>
    );
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

      {/* Honeypot — kullanıcı görmez, botlar doldurur */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={set("website")}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        aria-hidden="true"
      />

      {status === "error" && (
        <p className="form-error-msg" role="alert">
          {errorMsg}{" "}
          <button type="button" className="link-btn" onClick={sendWhatsApp}>
            WhatsApp&apos;tan gönderin
          </button>
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Gönder"}
          {status !== "sending" && <ArrowRight />}
        </button>
        <button type="button" className="btn ghost" onClick={sendWhatsApp}>
          WhatsApp&apos;tan gönder
        </button>
      </div>
    </form>
  );
}
