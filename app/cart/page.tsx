// app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
  imageUrl?: string | null;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  function read() {
    try {
      const raw = localStorage.getItem("primus_cart");
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }

  function write(next: CartItem[]) {
    localStorage.setItem("primus_cart", JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  useEffect(() => {
    read();
    const onUpdate = () => read();
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.qty, 0),
    [items]
  );
  const total = (totalCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
  });

  function inc(id: string) {
    write(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }
  function dec(id: string) {
    write(
      items
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  }
  function remove(id: string) {
    write(items.filter((i) => i.id !== id));
  }
  function clear() {
    write([]);
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const lines = items.map(
    (i) =>
      `• ${i.name} x${i.qty} — ${((i.priceCents * i.qty) / 100).toFixed(2)}`
  );
  const msg = `Hi, I’d like to order:\n${lines.join("\n")}\nTotal: ${total}`;
  const waHref =
    (phone ? `https://wa.me/${phone}` : "https://wa.me/") +
    `?text=${encodeURIComponent(msg)}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="glass p-4 rounded-2xl">
          <div className="text-white/70">Your cart is empty.</div>
          <Link href="/shop" className="btn-primary mt-3 inline-flex">
            Go to shop
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-3">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex gap-3 items-center rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="relative h-20 w-24 rounded-lg overflow-hidden bg-white/5">
                  {i.imageUrl ? (
                    <Image
                      src={i.imageUrl}
                      alt={i.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-white/50">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-white/70">
                    {(i.priceCents / 100).toLocaleString(undefined, {
                      style: "currency",
                      currency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-outline" onClick={() => dec(i.id)}>
                    −
                  </button>
                  <div className="min-w-8 text-center">{i.qty}</div>
                  <button className="btn-outline" onClick={() => inc(i.id)}>
                    +
                  </button>
                </div>
                <button className="btn-outline" onClick={() => remove(i.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between glass rounded-2xl p-4">
            <div className="text-lg">
              <span className="text-white/70 mr-2">Total:</span>
              <span className="font-bold text-brand-gold">{total}</span>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline" onClick={clear}>
                Clear
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Checkout via WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
