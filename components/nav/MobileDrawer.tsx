"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function MobileDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
      role="dialog"
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute left-0 top-0 h-full w-[82%] max-w-sm p-6 glass bg-brand-ink/70 backdrop-blur-lg
          transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-semibold">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={onClose}
              className="px-3 py-3 rounded-xl hover:bg-white/10"
            >
              {i.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-2">
            <Link
              href="/tickets"
              onClick={onClose}
              className="btn-primary flex-1"
            >
              Buy Tickets
            </Link>
            <Link href="/shop" onClick={onClose} className="btn-outline flex-1">
              Shop
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}
