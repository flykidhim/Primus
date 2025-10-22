// lib/whatsapp.ts
export function waCheckoutLink(number: string, text: string) {
  const n = (number || "").replace(/[^\d]/g, ""); // keep digits only
  const t = encodeURIComponent(text);
  return `https://wa.me/${n}?text=${t}`;
}
