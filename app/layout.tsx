import "./globals.css";
import SiteHeader from "@/components/nav/SiteHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-brand-ink to-[#070B12]">
        <SiteHeader />
        <main className="container py-6">{children}</main>
        <footer className="border-t border-white/10">
          <div className="container py-6 text-sm text-white/60">
            © {new Date().getFullYear()} Primus FC — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
