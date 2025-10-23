import Link from "next/link";
import Image from "next/image";
import { getMedia } from "@/lib/repos";

export const metadata = {
  title: "Media Gallery — Primus FC",
  description:
    "Explore our collection of matchday photos, training sessions, press conferences, and exclusive behind-the-scenes content.",
};

type SP = { cat?: string };

export default async function MediaPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const { cat } = (await (searchParams ?? Promise.resolve({}))) as SP;
  const items = await getMedia(cat);
  const cats = [
    "All",
    "Matchday",
    "Training",
    "Press",
    "Events",
    "Behind the Scenes",
  ];

  // Count items per category for the filter buttons
  const getCategoryCount = (category: string) => {
    if (category === "All") return items.length;
    return items.filter((item: any) => item.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Visual Story
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Media{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Dive into the world of Primus FC through our exclusive collection
              of photos and videos from matches, training, and community events.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {cats.map((c) => {
              const href =
                c === "All" ? "/media" : `/media?cat=${encodeURIComponent(c)}`;
              const active = (cat ?? "All") === c;
              const count = getCategoryCount(c);

              return (
                <Link
                  key={c}
                  href={href}
                  className={`group relative px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-brand-gold text-black border-brand-gold shadow-lg shadow-brand-gold/30"
                      : "bg-white/5 text-white/90 border-white/20 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {c}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        active ? "bg-black/20" : "bg-white/10"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Media Grid */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {items.map((m: any) => {
                const thumb = m.type === "video" ? m.posterUrl || m.url : m.url;
                return (
                  <Link
                    key={m.id}
                    href={`/media/${m.id}`}
                    className="group block transform hover:scale-105 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-brand-gold/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-gold/20">
                      <Image
                        src={thumb}
                        alt={m.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Video Indicator */}
                      {m.type === "video" && (
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-brand-gold/90 grid place-items-center transform group-hover:scale-110 transition-transform shadow-2xl">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="ml-1"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-black/80 rounded-xl p-3 backdrop-blur-sm">
                          <h3 className="font-semibold text-white text-sm line-clamp-1 mb-1">
                            {m.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            {m.category && (
                              <span className="text-xs text-brand-gold font-semibold">
                                {m.category}
                              </span>
                            )}
                            <span className="text-xs text-white/60">
                              {new Date(m.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            m.type === "video"
                              ? "bg-red-500/90 text-white"
                              : "bg-white/90 text-black"
                          }`}
                        >
                          {m.type === "video" ? "VIDEO" : "PHOTO"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Media Found
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                No media items match your current filter. Try selecting a
                different category or browse all media.
              </p>
            </div>
          )}

          {/* Gallery Stats */}
          {items.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-gold">
                    {items.length}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    Total Items
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-gold">
                    {items.filter((item: any) => item.type === "video").length}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    Videos
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-gold">
                    {items.filter((item: any) => item.type === "photo").length}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    Photos
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
