"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// ✅ Static import prevents 404s and gives a blur placeholder
import logo from "@/public/brand/primus-logo.png";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/news", label: "News" },
  { href: "/media", label: "Media" },
  { href: "/history", label: "History" },
  { href: "/shop", label: "Shop" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!drawerRef.current) return;
      if (!drawerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // ESC closes things
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close drawer/search on route change
  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19] border-b border-white/10">
      <div className="container h-16 flex items-center justify-between gap-3">
        {/* Brand + hamburger */}
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>

          {/* Brand: logo + name — ALWAYS visible (mobile + desktop) */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3"
            aria-label="Primus FC home"
          >
            <Image
              src={logo}
              alt="Primus FC crest"
              width={40}
              height={40}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-1 ring-white/10 shadow"
              priority
              placeholder="blur"
              sizes="(max-width:640px) 36px, 40px"
            />
            <span
              className="
                font-extrabold tracking-wide
                text-sm sm:text-base
                whitespace-nowrap truncate
                max-w-[120px] sm:max-w-none
              "
            >
              <span className="text-white">PRIMUS</span>{" "}
              <span className="text-brand-gold">FC</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm ${
                  active ? "text-white" : "text-white/85 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            onClick={() => setShowSearch((s) => !s)}
            className="h-9 w-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="m21 21-4.3-4.3M10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="border-t border-white/10">
          <div className="container py-3">
            <form role="search" action="/search" className="flex gap-2">
              <input
                name="q"
                placeholder="Search news, players, products…"
                className="flex-1 px-3 py-2 rounded-xl bg-[#111726] border border-white/15 text-white placeholder:text-white/55"
                aria-label="Search site"
              />
              <button className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-4 py-2 font-semibold text-black hover:brightness-110">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <aside
          ref={drawerRef}
          className={`absolute right-0 top-0 h-full w-[86%] max-w-xs bg-[#0B0F19] border-l border-white/10 p-4 shadow-2xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Image
                src={logo}
                alt="Primus FC crest"
                width={26}
                height={26}
                className="h-7 w-7 rounded-full ring-1 ring-white/10"
                priority
                placeholder="blur"
              />
              <b className="text-sm">
                <span className="text-white">PRIMUS</span>{" "}
                <span className="text-brand-gold">FC</span>
              </b>
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg hover:bg-white/10 ${
                    active ? "text-white" : "text-white/85"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="text-xs uppercase text-white/60 mb-2">Store</div>
            <div className="flex flex-col gap-1">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Shop
              </Link>
              <Link
                href="/tickets"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Tickets
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
