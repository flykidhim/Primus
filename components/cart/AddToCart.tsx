// components/cart/AddToCart.tsx
"use client";

import { useState } from "react";

type Props = {
  id: string;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
};

type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
  imageUrl?: string | null;
};

export default function AddToCart({ id, name, priceCents, imageUrl }: Props) {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  function readCart(): CartItem[] {
    try {
      const raw = localStorage.getItem("primus_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  function writeCart(items: CartItem[]) {
    localStorage.setItem("primus_cart", JSON.stringify(items));
    // notify listeners (header badge, cart page, etc.)
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function add() {
    setAdding(true);
    const items = readCart();
    const idx = items.findIndex((i) => i.id === id);
    if (idx >= 0) {
      items[idx].qty += qty;
    } else {
      items.push({ id, name, priceCents, qty, imageUrl });
    }
    writeCart(items);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="inline-flex items-center gap-2">
        <span className="text-sm text-white/70">Qty</span>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="w-16 px-2 py-1 rounded-lg bg-white/10 border border-white/10"
        />
      </label>

      <button
        onClick={add}
        disabled={adding}
        className="btn-primary"
        aria-live="polite"
      >
        {adding ? "Adding…" : "Add to cart"}
      </button>

      {added && <span className="text-green-400 text-sm">Added ✓</span>}
    </div>
  );
}
