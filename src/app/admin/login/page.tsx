"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { asset } from "@/lib/asset";

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testMode, setTestMode] = useState(false);

  async function requestOtp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestMode(!!data.testMode);
        setStep("code");
      } else {
        setError(data.error || "Bir hata oluştu.");
      }
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (res.ok) {
        router.replace(next);
        router.refresh();
      } else {
        setError(data.error || "Kod doğrulanamadı.");
      }
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <Image src={asset("/images/logo.png")} alt="Pino Römork" width={286} height={107} />
          <span>Yönetim Paneli</span>
        </div>

        {step === "phone" ? (
          <form onSubmit={requestOtp} className="contact-form">
            <p className="admin-login-desc">
              Yönetici telefon numaranızı girin; WhatsApp ile doğrulama kodu
              göndereceğiz.
            </p>
            <label className="field">
              <span>Telefon</span>
              <input
                type="tel"
                autoFocus
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xx xxx xx xx"
              />
            </label>
            {error && <p className="form-error-msg">{error}</p>}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Gönderiliyor…" : "Kod gönder"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="contact-form">
            <p className="admin-login-desc">
              {phone} numarasına gönderilen 6 haneli kodu girin.
              {testMode && (
                <>
                  <br />
                  <b className="accent">Test modu:</b> kod{" "}
                  <code>123456</code>
                </>
              )}
            </p>
            <label className="field">
              <span>Doğrulama kodu</span>
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="______"
                maxLength={6}
              />
            </label>
            {error && <p className="form-error-msg">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Doğrulanıyor…" : "Giriş yap"}
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                }}
              >
                Geri
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
