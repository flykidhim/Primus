import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { waCheckoutLink } from "@/lib/whatsapp";
import MatchCard from "@/components/MatchCard";

export const metadata = { title: "Tickets — Primus FC" };

export default async function TicketsPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const matches = await prisma.match.findMany({
    where: { status: { in: ["SCHEDULED", "LIVE"] } },
    orderBy: { date: "asc" },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Tickets</h1>
        <p className="text-white/70">
          Buy tickets securely via WhatsApp. Pick a match below and we’ll
          pre-fill your request.
        </p>
      </header>

      {matches.length === 0 ? (
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          No upcoming fixtures. Check back soon!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {matches.map((m) => {
            const msg =
              `Hi Primus FC, I want to buy tickets.\n\n` +
              `Match: ${m.home} vs ${m.away}\n` +
              `Competition: ${m.competition}\n` +
              `Date: ${m.date.toLocaleString()}\n` +
              `Venue: ${m.venue ?? "TBC"}\n\n` +
              `Qty: 2\n` +
              `Category: Regular\n` +
              `Please confirm availability.`;
            const href = waCheckoutLink(phone, msg);
            return (
              <div
                key={m.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <MatchCard
                  date={m.date}
                  competition={m.competition}
                  home={m.home}
                  away={m.away}
                  status={m.status}
                />
                <div className="mt-3 flex gap-2">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-brand-gold px-3 py-2 text-black font-semibold hover:brightness-110"
                  >
                    Buy via WhatsApp
                  </a>
                  <Link
                    href="/fixtures"
                    className="inline-flex items-center rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
                  >
                    See details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-bold">FAQs</h2>
        <ul className="mt-2 space-y-1 text-sm text-white/80">
          <li>
            • Payment accepted via mobile money or bank transfer (instructions
            sent on WhatsApp).
          </li>
          <li>• E-tickets delivered instantly after confirmation.</li>
          <li>
            • Support: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "WhatsApp"}
          </li>
        </ul>
      </div>
    </div>
  );
}
