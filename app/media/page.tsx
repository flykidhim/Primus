// app/media/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getMedia } from "@/lib/repos";

export const metadata = { title: "Media — Primus FC" };

type SP = { cat?: string };

export default async function MediaPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const { cat } = (await (searchParams ?? Promise.resolve({}))) as SP;
  const items = await getMedia(cat);
  const cats = ["All", "Matchday", "Training", "Press", "Events"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => {
          const href =
            c === "All" ? "/media" : `/media?cat=${encodeURIComponent(c)}`;
          const active = (cat ?? "All") === c;
          return (
            <a
              key={c}
              href={href}
              className={`px-3 py-1.5 rounded-lg border ${
                active
                  ? "bg-brand-gold text-black"
                  : "bg-white/10 border-white/10 hover:bg-white/15"
              }`}
            >
              {c}
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((m: any) => {
          const thumb = m.type === "video" ? m.posterUrl || m.url : m.url;
          return (
            <Link
              key={m.id}
              href={`/media/${m.id}`}
              className="group block relative"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={thumb}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-sm font-semibold line-clamp-1">
                    {m.title}
                  </div>
                  {m.category && (
                    <div className="text-xs text-white/70">{m.category}</div>
                  )}
                </div>
              </div>
              {m.type === "video" && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="h-8 w-8 rounded-full bg-black/70 grid place-items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
