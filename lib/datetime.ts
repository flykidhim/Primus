// lib/datetime.ts
export type AnyDate = string | number | Date | undefined | null;

export function toDate(v: AnyDate): Date {
  if (v instanceof Date) return v;
  if (typeof v === "string" || typeof v === "number") return new Date(v);
  // fallback (epoch) to satisfy TS and avoid runtime crash
  return new Date(0);
}

export function toISO(v: string | Date): string {
  return typeof v === "string" ? v : v.toISOString();
}
