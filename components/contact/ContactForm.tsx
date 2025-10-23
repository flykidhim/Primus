"use client";
import { useState } from "react";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");
  const [msg, setMsg] = useState<string>("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      setStatus("loading");
      const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      setMsg("Thanks — we’ll get back to you soon.");
      form.reset();
    } catch {
      setStatus("err");
      setMsg("Couldn’t send. Try again or WhatsApp us.");
    }
  }
  return (
    <form onSubmit={onSubmit} className={compact ? "grid gap-3 md:grid-cols-3" : "grid gap-4 md:grid-cols-2"}>
      <input required name="name" placeholder="Your name" className="surface px-3 py-2" />
      <input required type="email" name="email" placeholder="Email" className="surface px-3 py-2" />
      <input name="phone" placeholder="Phone (optional)" className="surface px-3 py-2 md:col-span-2" />
      <textarea required name="message" placeholder="Your message" rows={compact ? 2 : 4} className="surface px-3 py-2 md:col-span-2"></textarea>
      <div className="md:col-span-2 flex items-center gap-3">
        <button className="btn-primary" disabled={status==="loading"}>{status==="loading"?"Sending...":"Send message"}</button>
        {msg && <span className="text-sm text-white/70">{msg}</span>}
      </div>
    </form>
  );
}
