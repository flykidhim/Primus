import Image from "next/image";
export const metadata = { title: "History — Primus FC" };
export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5 border-brand-gold/30">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/primus-logo.png"
            alt="Primus FC"
            width={48}
            height={48}
          />
          <div>
            <h1 className="text-2xl font-extrabold">Primus FC</h1>
            <p className="text-white/70">
              Founded 2025 — Gold & Black since day one
            </p>
          </div>
        </div>
      </div>
      <section className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h2 className="font-semibold text-brand-gold">Identity</h2>
          <p className="text-white/80 mt-2">
            Our crest blends a classic ball with a golden wreath, reflecting
            ambition and excellence. The palette is <b>gold</b>, <b>black</b>,
            and crisp <b>white</b>, with a diamond-blue accent.
          </p>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="font-semibold text-brand-gold">Vision</h2>
          <p className="text-white/80 mt-2">
            To build the most connected, community-driven football club in the
            region — academy first, bold football on the pitch.
          </p>
        </div>
      </section>
      <section className="glass rounded-2xl p-5">
        <h2 className="font-semibold text-brand-gold">Milestones</h2>
        <ol className="mt-3 space-y-2">
          <li>
            <span className="text-brand-gold">2025</span> — Club founded,
            inaugural season, first academy trials.
          </li>
          <li>
            <span className="text-brand-gold">2026</span> — Stadium renovation
            phase 1; digital membership launched.
          </li>
          <li>
            <span className="text-brand-gold">2027</span> — Youth Cup finalists;
            first continental tour.
          </li>
        </ol>
      </section>
    </div>
  );
}
