"use client";

import { useState } from "react";

type Position = "GK" | "DF" | "MF" | "FW";

type PlayerDTO = {
  id: string;
  name: string;
  position: string; // stored as string in DB, we’ll map to Position in form
  number: number;
  nationality: string | null;
  heightCm: number | null;
  bio: string | null;
  photoUrl: string | null;
};

type PlayerForm = {
  name: string;
  position: Position;
  number: number;
  nationality: string;
  heightCm: number | ""; // allow empty while typing
  bio: string;
  photoUrl: string;
};

export default function Editor({ player }: { player: PlayerDTO }) {
  const [form, setForm] = useState<PlayerForm>({
    name: player.name ?? "",
    position: ["GK", "DF", "MF", "FW"].includes(player.position)
      ? (player.position as Position)
      : "FW",
    number: player.number ?? 0,
    nationality: player.nationality ?? "",
    heightCm: player.heightCm ?? "",
    bio: player.bio ?? "",
    photoUrl: player.photoUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch(`/api/admin/players/${player.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        // Coerce height to number | null for API
        heightCm: form.heightCm === "" ? null : Number(form.heightCm),
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setMsg("Save failed");
      return;
    }
    setMsg("Saved ✓");
  }

  async function del() {
    if (!confirm("Delete player?")) return;
    const res = await fetch(`/api/admin/players/${player.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    window.location.href = "/admin/players";
  }

  return (
    <div className="glass rounded-2xl p-4 grid gap-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
        />
        <Select
          label="Position"
          value={form.position}
          onChange={(v) => setForm((s) => ({ ...s, position: v as Position }))}
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
