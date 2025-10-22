// app/team/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlayerById } from "@/lib/repos";

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

      <div className="grid gap-6 md:grid-cols-[360px,1fr]">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {p.photoUrl ? (
            <Image
              src={p.photoUrl}
              alt={p.name}
              fill
              sizes="(max-width:768px) 100vw, 360px"
              className="object-cover"
            />
          ) : (
            <div className="grid place-items-center h-full text-white/50">
              No image
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold">
            <span className="text-brand-gold">#{p.number}</span> {p.name}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            <span className="px-2 py-0.5 rounded bg-white/10">
              {p.position}
            </span>
            {p.nationality && (
              <span className="px-2 py-0.5 rounded bg-white/10">
                {p.nationality}
              </span>
            )}
            {p.heightCm && (
              <span className="px-2 py-0.5 rounded bg-white/10">
                {p.heightCm} cm
              </span>
            )}
          </div>

          {p.bio && <p className="text-white/85 leading-7">{p.bio}</p>}

          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <li className="glass rounded-xl p-3 text-center">
              <div className="text-xs text-white/70">Apps</div>
              <div className="text-xl font-bold">{p.appearances}</div>
            </li>
            <li className="glass rounded-xl p-3 text-center">
              <div className="text-xs text-white/70">Goals</div>
              <div className="text-xl font-bold">{p.goals}</div>
            </li>
            <li className="glass rounded-xl p-3 text-center">
              <div className="text-xs text-white/70">Assists</div>
              <div className="text-xl font-bold">{p.assists}</div>
            </li>
          </ul>

          {p.photos?.length ? (
            <div className="pt-2">
              <div className="text-sm mb-2 text-white/70">Gallery</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {p.photos
                  .slice()
                  .sort((a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0))
                  .map((img: any) => (
                    <div
                      key={img.id}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt ?? p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
