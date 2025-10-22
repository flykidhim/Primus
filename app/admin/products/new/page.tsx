"use client";

import { useState } from "react";

type NewProductForm = {
  name: string;
  slug: string;
  priceCents: number | "";
  stock: number | "";
  description: string;
  imageUrl: string;
};

export default function NewProductPage() {
  const [form, setForm] = useState<NewProductForm>({
    name: "",
    slug: "",
    priceCents: "",
    stock: "",
    description: "",
    imageUrl: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        priceCents: form.priceCents === "" ? 0 : Number(form.priceCents),
        stock: form.stock === "" ? 0 : Number(form.stock),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr("Failed to create");
      return;
    }
    const j = (await res.json()) as { product: { id: string } };
    window.location.href = `/admin/products/${j.product.id}`;
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">New Product</h1>
      <form onSubmit={submit} className="glass rounded-2xl p-4 grid gap-3">
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
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <div className="flex gap-2">
          <button disabled={loading} className="btn-primary">
            {loading ? "Saving…" : "Create"}
          </button>
        </div>
      </form>
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
