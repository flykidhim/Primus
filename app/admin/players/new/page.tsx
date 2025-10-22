"use client";

import { useState } from "react";

type Position = "GK" | "DF" | "MF" | "FW";

type NewPlayerForm = {
  name: string;
  position: Position;
  number: number;
  nationality: string;
  heightCm: number | "";
  bio: string;
  photoUrl: string;
};

export default function NewPlayerPage() {
  const [form, setForm] = useState<NewPlayerForm>({
    name: "",
    position: "FW",
    number: 9,
    nationality: "",
    heightCm: "",
    bio: "",
    photoUrl: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await fetch("/api/admin/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        heightCm: form.heightCm === "" ? null : Number(form.heightCm),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr("Failed to create");
      return;
    }
    const j = (await res.json()) as { player: { id: string } };
    window.location.href = `/admin/players/${j.player.id}`;
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">New Player</h1>
      <form onSubmit={submit} className="glass rounded-2xl p-4 grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Input
            label="Name"
            value={form.name}
            onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          />
          <Select
            label="Position"
            value={form.position}
            onChange={(v) =>
              setForm((s) => ({ ...s, position: v as Position }))
            }
            options={["GK", "DF", "MF", "FW"]}
          />
          <Input
            label="Number"
            type="number"
            value={String(form.number)}
            onChange={(v) => setForm((s) => ({ ...s, number: Number(v) || 0 }))}
          />
          <Input
            label="Nationality"
            value={form.nationality}
            onChange={(v) => setForm((s) => ({ ...s, nationality: v }))}
          />
          <Input
            label="Height (cm)"
            type="number"
            value={form.heightCm === "" ? "" : String(form.heightCm)}
            onChange={(v) =>
              setForm((s) => ({
                ...s,
                heightCm: v === "" ? "" : Number(v) || "",
              }))
            }
          />
          <Input
            label="Photo URL"
            value={form.photoUrl}
            onChange={(v) => setForm((s) => ({ ...s, photoUrl: v }))}
          />
        </div>
        <TextArea
          label="Bio"
          value={form.bio}
          onChange={(v) => setForm((s) => ({ ...s, bio: v }))}
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

/* ---------- small, typed input primitives ---------- */

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

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};
function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-white/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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
