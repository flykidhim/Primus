"use client";

import { useState } from "react";

type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  stock: number;
  description: string | null;
  imageUrl: string | null;
};

type ProductForm = {
  name: string;
  slug: string;
  priceCents: number | ""; // allow empty while typing
  stock: number | ""; // allow empty while typing
  description: string;
  imageUrl: string;
};

export default function Editor({ product }: { product: ProductDTO }) {
  const [form, setForm] = useState<ProductForm>({
    name: product.name ?? "",
    slug: product.slug ?? "",
    priceCents: product.priceCents ?? "",
    stock: product.stock ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    const body = {
      ...form,
      priceCents: form.priceCents === "" ? 0 : Number(form.priceCents),
      stock: form.stock === "" ? 0 : Number(form.stock),
    };
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) {
      setMsg("Save failed");
      return;
    }
    setMsg("Saved ✓");
  }

  async function del() {
    if (!confirm("Delete product?")) return;
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    window.location.href = "/admin/products";
  }

  return (
    <div className="glass rounded-2xl p-4 grid gap-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(v) => setForm((s) => ({ ...s, slug: v }))}
        />
        <Input
          label="Price (cents)"
          type="number"
          value={form.priceCents === "" ? "" : String(form.priceCents)}
          onChange={(v) =>
            setForm((s) => ({
              ...s,
              priceCents: v === "" ? "" : Number(v) || 0,
            }))
          }
        />
        <Input
          label="Stock"
          type="number"
          value={form.stock === "" ? "" : String(form.stock)}
          onChange={(v) =>
            setForm((s) => ({
              ...s,
              stock: v === "" ? "" : Number(v) || 0,
            }))
          }
        />
        <Input
          label="Cover Image URL"
          value={form.imageUrl}
          onChange={(v) => setForm((s) => ({ ...s, imageUrl: v }))}
          type="url"
        />
      </div>
      <TextArea
        label="Description"
        value={form.description}
        onChange={(v) => setForm((s) => ({ ...s, description: v }))}
      />
      <div className="flex gap-2">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={del} className="btn-outline">
          Delete
        </button>
        {msg && <div className="text-white/70 self-center">{msg}</div>}
      </div>
    </div>
  );
}

/* ---------- typed input primitives ---------- */

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "url";
};
function Input({ label, value, onChange, type = "text" }: InputProps) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-white/70">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
      />
    </label>
  );
}

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};
function TextArea({ label, value, onChange }: TextAreaProps) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-white/70">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
      />
    </label>
  );
}
