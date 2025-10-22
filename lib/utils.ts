export function currency(cents: number, currency: string = "USD") {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}
export function clsx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}
