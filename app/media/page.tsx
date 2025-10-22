// app/media/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getMedia } from "@/lib/repos"; // adjust if your repo exports differently

export const metadata = { title: "Media — Primus FC" };

type MediaItem = {
  id: string;
  title: string;
  url: string;
  posterUrl?: string | null;
  type: "photo" | "video" | string;
  category?: string | null;
  createdAt?: string | Date | null;
};

const CATEGORIES = [
  "All",
  "Matchday",
  "Training",
  "Press",
  "Events",
  "Video",
  "Photo",
];

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams; // ✅ Next 15: await it

  // If your getMedia only accepts a category: pass undefined for "All"
  const filter = cat && cat !== "All" ? cat : undefined;

  // If your getMedia supports more filters, extend here (q/type/etc.)
  const items = (await getMedia(filter)) as MediaItem[];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Media</h1>
        <nav className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => {
            const href =
              c === "All" ? "/media" : `/media?cat=${encodeURIComponent(c)}`;
            const active = (cat ?? "All") === c;
            return (
              <Link
                key={c}
                href={href}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  active
                    ? "bg-brand-gold text-black border-brand-gold"
                    : "bg-white/5 text-white/85 border-white/10 hover:bg-white/10"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </nav>
      </header>

      {items.length === 0 ? (
        <div className="text-white/70">No media yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => {
            const isVideo =
              m.type === "video" ||
              (typeof m.url === "string" &&
                (m.url.endsWith(".mp4") ||
                  m.url.endsWith(".webm") ||
                  m.url.includes("youtube.com") ||
                  m.url.includes("youtu.be")));

            const thumb = isVideo ? m.posterUrl || m.url : m.url;

            return (
              <Link
                key={m.id}
                href={`/media/${m.id}`}
                className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="relative aspect-video">
                  <Image
                    src={thumb || m.url}
                    alt={m.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {isVideo && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="h-9 w-9 rounded-full bg-black/70 grid place-items-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="font-semibold line-clamp-1">{m.title}</div>
                  <div className="text-xs text-white/60 mt-1 flex gap-2">
                    {m.category && <span>{m.category}</span>}
                    {m.createdAt && (
                      <span>
                        · {new Date(String(m.createdAt)).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
