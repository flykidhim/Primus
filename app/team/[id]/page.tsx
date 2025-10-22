import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlayerById } from "@/lib/player-source";

export const metadata = { title: "Player — Primus FC" };

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getPlayerById(id);
  if (!p) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/team" className="text-white/70 hover:text-white text-sm">
        ← Back to squad
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {p.photoUrl ? (
              <Image
                src={p.photoUrl}
                alt={p.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="grid place-items-center h-full text-white/50">
                No image
              </div>
            )}
            <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 text-xs">
              #{p.number}
            </div>
          </div>

          {p.photos?.length ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {p.photos.map((ph) => (
                <div
                  key={ph.id}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={ph.url}
                    alt={ph.alt ?? p.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <header className="space-y-1">
            <h1 className="text-3xl font-extrabold">{p.name}</h1>
            <div className="text-white/80">
              {p.position} • {p.nationality ?? "—"}{" "}
              {p.heightCm ? `• ${p.heightCm} cm` : ""}
            </div>
          </header>

          {/* ✅ BIO RENDERS HERE */}
          {p.bio && <p className="text-white/85 leading-7">{p.bio}</p>}

          <section className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text-2xl font-extrabold">{p.appearances}</div>
              <div className="text-xs text-white/70">Appearances</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text-2xl font-extrabold">{p.goals}</div>
              <div className="text-xs text-white/70">Goals</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text-2xl font-extrabold">{p.assists}</div>
              <div className="text-xs text-white/70">Assists</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
