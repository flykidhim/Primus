import HeroCarousel from "@/components/hero/HeroCarousel";
import MatchCard from "@/components/MatchCard";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import {
  getArticles,
  getMedia,
  getPlayers,
  getProducts,
  getRecentMatch,
  getUpcomingMatch,
} from "@/lib/repos";

export default async function HomePage() {
  const [mediaAll, upcoming, recent, products, players, news, gallery] =
    await Promise.all([
      getMedia(),
      getUpcomingMatch(),
      getRecentMatch(),
      getProducts(),
      getPlayers(),
      getArticles(),
      getMedia("Matchday"),
    ]);

  const slides = mediaAll.slice(0, 5).map((m: any) => ({
    title: m.title,
    subtitle: "Primus FC — Gold Standard",
    image:
      m.type === "video"
        ? m.posterUrl || "/media/gallery/gallery-1.svg"
        : m.url,
    overlay: "dark" as const,
    cta: {
      label: m.type === "video" ? "Watch" : "Explore Media",
      href: `/media/${m.id}`,
    },
  }));

  const squadSpotlight = players.slice(0, 8);
  const latestNews = news.slice(0, 3);
  const latestGallery = gallery.slice(0, 6);
  const shopPicks = products.slice(0, 5);

  return (
    <div className="space-y-8">
      {slides.length > 0 && <HeroCarousel slides={slides} />}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Next Match</h2>
          {upcoming ? (
            <MatchCard
              date={upcoming.date}
              competition={upcoming.competition}
              home={upcoming.home}
              away={upcoming.away}
              status={upcoming.status}
              cta={
                <a
                  href="/tickets"
                  className="inline-block mt-2 px-3 py-1 rounded bg-brand-gold text-black text-sm"
                >
                  Tickets
                </a>
              }
            />
          ) : (
            <p>No upcoming fixtures.</p>
          )}
        </div>
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Last Result</h2>
          {recent ? (
            <MatchCard
              date={recent.date}
              competition={recent.competition}
              home={recent.home}
              away={recent.away}
              status={recent.status}
              homeScore={recent.homeScore}
              awayScore={recent.awayScore}
            />
          ) : (
            <p>No results yet.</p>
          )}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">Squad Spotlight</h2>
          <Link
            href="/team"
            className="text-sm text-brand-gold hover:underline"
          >
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {squadSpotlight.map((p: any) => (
            <article key={p.id} className="glass rounded-2xl overflow-hidden">
              <img
                src={
                  p.photoUrl ??
                  p.photos?.[0]?.url ??
                  "/media/players/mensah-portrait.svg"
                }
                alt={p.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-3">
                <div className="font-semibold">{p.name}</div>
                <div className="text-white/70 text-sm">
                  {p.position} • #{p.number}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">Latest News</h2>
          <Link
            href="/news"
            className="text-sm text-brand-gold hover:underline"
          >
            More news
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((n: any) => (
            <article key={n.id} className="glass rounded-2xl overflow-hidden">
              {n.coverUrl && (
                <img
                  src={n.coverUrl}
                  alt={n.title}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{n.title}</h3>
                {n.excerpt && (
                  <p className="text-sm text-white/70 mt-1">{n.excerpt}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">Latest Media</h2>
          <Link
            href="/media"
            className="text-sm text-brand-gold hover:underline"
          >
            View gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {latestGallery.map((m: any) => (
            <Link
              key={m.id}
              href={`/media/${m.id}`}
              className="group block relative"
            >
              <img
                src={m.type === "video" ? m.posterUrl || m.url : m.url}
                alt={m.title}
                className="h-28 w-full rounded-xl object-cover"
              />
              {m.type === "video" && (
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
            </Link>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">Official Store</h2>
          <Link
            href="/shop"
            className="text-sm text-brand-gold hover:underline"
          >
            Shop all
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shopPicks.map((p: any) => (
            <li key={p.id}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
