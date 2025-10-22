// /components/MobileNav.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Item = { href: string; label: string };

export default function MobileNav({
  items,
  logo,
}: {
  items: Item[];
  logo?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl border px-3 py-2 sm:hidden"
      >
        ☰
      </button>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-[320px] transform bg-white shadow-2xl transition-transform sm:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            {logo && <img src={logo} alt="logo" className="w-8 h-8" />}
            <span className="font-semibold">Menu</span>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ×
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-gray-100"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
