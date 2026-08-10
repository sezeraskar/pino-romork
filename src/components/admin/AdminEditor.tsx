"use client";

import { useState } from "react";

export type FieldDef = {
  key: string;
  label: string;
  type:
    | "text"
    | "tel"
    | "email"
    | "textarea"
    | "number"
    | "checkbox"
    | "image"
    | "select"
    | "stringlist"
    | "kvlist"
    | "repeater"
    | "blocklist";
  placeholder?: string;
  options?: string[];
  itemFields?: FieldDef[];
  full?: boolean;
};

type Val = Record<string, unknown>;

function newItem(fields: FieldDef[]): Val {
  const o: Val = {};
  for (const f of fields) {
    if (f.type === "checkbox") o[f.key] = false;
    else if (f.type === "stringlist" || f.type === "kvlist" || f.type === "repeater" || f.type === "blocklist") o[f.key] = [];
    else o[f.key] = "";
  }
  return o;
}

/* ---- Alan render ---- */
function FieldView({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (def.type === "textarea") {
    return (
      <label className={`ad-field ${def.full ? "full" : ""}`}>
        <span>{def.label}</span>
        <textarea rows={4} value={String(value ?? "")} placeholder={def.placeholder} onChange={(e) => onChange(e.target.value)} />
      </label>
    );
  }
  if (def.type === "checkbox") {
    return (
      <label className="ad-check">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span>{def.label}</span>
      </label>
    );
  }
  if (def.type === "select") {
    return (
      <label className={`ad-field ${def.full ? "full" : ""}`}>
        <span>{def.label}</span>
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(def.options ?? []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  }
  if (def.type === "image") {
    const v = String(value ?? "");
    return (
      <label className={`ad-field ${def.full ? "full" : ""}`}>
        <span>{def.label}</span>
        <div className="ad-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {v && <img src={v} alt="" />}
          <input type="text" value={v} placeholder="/images/... veya https://" onChange={(e) => onChange(e.target.value)} />
        </div>
      </label>
    );
  }
  if (def.type === "stringlist") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className={`ad-field full`}>
        <span>{def.label}</span>
        {list.map((s, i) => (
          <div className="ad-row" key={i}>
            <input type="text" value={s} onChange={(e) => { const n = [...list]; n[i] = e.target.value; onChange(n); }} />
            <button type="button" className="ad-del" onClick={() => onChange(list.filter((_, j) => j !== i))}>×</button>
          </div>
        ))}
        <button type="button" className="ad-add" onClick={() => onChange([...list, ""])}>+ Ekle</button>
      </div>
    );
  }
  if (def.type === "kvlist") {
    const list = Array.isArray(value) ? (value as [string, string][]) : [];
    return (
      <div className="ad-field full">
        <span>{def.label}</span>
        {list.map((pair, i) => (
          <div className="ad-row" key={i}>
            <input type="text" placeholder="Etiket" value={pair[0] ?? ""} onChange={(e) => { const n = list.map((p) => [...p] as [string, string]); n[i][0] = e.target.value; onChange(n); }} />
            <input type="text" placeholder="Değer" value={pair[1] ?? ""} onChange={(e) => { const n = list.map((p) => [...p] as [string, string]); n[i][1] = e.target.value; onChange(n); }} />
            <button type="button" className="ad-del" onClick={() => onChange(list.filter((_, j) => j !== i))}>×</button>
          </div>
        ))}
        <button type="button" className="ad-add" onClick={() => onChange([...list, ["", ""]])}>+ Ekle</button>
      </div>
    );
  }
  if (def.type === "blocklist") {
    const list = Array.isArray(value) ? (value as Val[]) : [];
    const upd = (i: number, patch: Val) => onChange(list.map((b, j) => (j === i ? { ...b, ...patch } : b)));
    return (
      <div className="ad-field full">
        <span>{def.label}</span>
        {list.map((b, i) => {
          const type = String(b.type ?? "p");
          return (
            <div className="ad-block" key={i}>
              <div className="ad-block-head">
                <select value={type} onChange={(e) => upd(i, { type: e.target.value })}>
                  <option value="h2">Başlık (H2)</option>
                  <option value="p">Paragraf</option>
                  <option value="ul">Liste</option>
                </select>
                <button type="button" className="ad-del" onClick={() => onChange(list.filter((_, j) => j !== i))}>×</button>
              </div>
              {type === "ul" ? (
                <FieldView def={{ key: "items", label: "Maddeler", type: "stringlist" }} value={b.items ?? []} onChange={(v) => upd(i, { items: v })} />
              ) : (
                <textarea rows={type === "h2" ? 1 : 3} value={String(b.text ?? "")} onChange={(e) => upd(i, { text: e.target.value })} />
              )}
            </div>
          );
        })}
        <div className="ad-add-row">
          <button type="button" className="ad-add" onClick={() => onChange([...list, { type: "h2", text: "" }])}>+ Başlık</button>
          <button type="button" className="ad-add" onClick={() => onChange([...list, { type: "p", text: "" }])}>+ Paragraf</button>
          <button type="button" className="ad-add" onClick={() => onChange([...list, { type: "ul", items: [""] }])}>+ Liste</button>
        </div>
      </div>
    );
  }
  if (def.type === "repeater") {
    const list = Array.isArray(value) ? (value as Val[]) : [];
    const fields = def.itemFields ?? [];
    const move = (i: number, dir: number) => {
      const j = i + dir;
      if (j < 0 || j >= list.length) return;
      const n = [...list];
      [n[i], n[j]] = [n[j], n[i]];
      onChange(n);
    };
    return (
      <div className="ad-field full">
        <span>{def.label}</span>
        {list.map((item, i) => (
          <div className="ad-item" key={i}>
            <div className="ad-item-head">
              <b>#{i + 1}</b>
              <div className="ad-item-actions">
                <button type="button" onClick={() => move(i, -1)} title="Yukarı">↑</button>
                <button type="button" onClick={() => move(i, 1)} title="Aşağı">↓</button>
                <button type="button" className="ad-del" onClick={() => onChange(list.filter((_, j) => j !== i))}>Sil</button>
              </div>
            </div>
            <div className="ad-grid">
              {fields.map((f) => (
                <FieldView key={f.key} def={f} value={item[f.key]} onChange={(v) => onChange(list.map((x, j) => (j === i ? { ...x, [f.key]: v } : x)))} />
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="ad-add" onClick={() => onChange([...list, newItem(fields)])}>+ Yeni Ekle</button>
      </div>
    );
  }
  // text / tel / email / number
  return (
    <label className={`ad-field ${def.full ? "full" : ""}`}>
      <span>{def.label}</span>
      <input
        type={def.type === "number" ? "number" : def.type}
        value={def.type === "number" ? Number(value ?? 0) : String(value ?? "")}
        placeholder={def.placeholder}
        onChange={(e) => onChange(def.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </label>
  );
}

/* ---- Ana editör ---- */
export default function AdminEditor({
  section,
  title,
  mode,
  fields,
  initial,
  itemFields,
  itemLabel = "Öğe",
}: {
  section: string;
  title: string;
  mode: "object" | "collection";
  fields?: FieldDef[];
  initial: unknown;
  itemFields?: FieldDef[];
  itemLabel?: string;
}) {
  const [data, setData] = useState<unknown>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function save() {
    setStatus("saving");
    setMsg("");
    try {
      const res = await fetch(`/api/admin/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setMsg(j.error || "Kaydedilemedi.");
      }
    } catch {
      setStatus("error");
      setMsg("Bağlantı hatası.");
    }
  }

  return (
    <div className="ad-editor">
      <div className="ad-editor-head">
        <h1>{title}</h1>
        <div className="ad-save">
          {status === "ok" && <span className="ad-ok">✓ Kaydedildi</span>}
          {status === "error" && <span className="ad-err">{msg}</span>}
          <button className="btn" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>

      {mode === "object" ? (
        <div className="ad-grid">
          {(fields ?? []).map((f) => (
            <FieldView key={f.key} def={f} value={(data as Val)[f.key]} onChange={(v) => setData({ ...(data as Val), [f.key]: v })} />
          ))}
        </div>
      ) : (
        <FieldView
          def={{ key: "_", label: itemLabel, type: "repeater", itemFields: itemFields ?? [] }}
          value={data}
          onChange={(v) => setData(v)}
        />
      )}
    </div>
  );
}
