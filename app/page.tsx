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

  // Create slides - starting with club vision slides, then media
  const slides = [
    // Club Vision Slide 1
    {
      title: "More Than a Club",
      subtitle:
        "We are a movement of hope, opportunity, and transformation for young African footballers from underserved communities.",
      image: "/media/gallery/gallery-4.jpg", // Fans image representing community
      overlay: "dark" as const,
      cta: {
        label: "Join Our Mission",
        href: "/about",
      },
    },
    // Club Vision Slide 2
    {
      title: "Building Legacies",
      subtitle:
        "Creating world-class footballers and responsible global citizens who inspire the next generation and uplift their communities.",
      image: "/media/gallery/gallery-2.jpg", // Training image representing development
      overlay: "dark" as const,
      cta: {
        label: "Our Vision",
        href: "/about",
      },
    },
    // Media slides
    ...mediaAll.slice(0, 3).map((m: any) => ({
      title: m.title,
      subtitle: "Experience the Gold Standard of Football Excellence",
      image:
        m.type === "video"
          ? m.posterUrl || "/media/gallery/gallery-1.jpg"
          : m.url,
      overlay: "dark" as const,
      cta: {
        label: m.type === "video" ? "Watch Highlights" : "Explore Gallery",
        href: `/media/${m.id}`,
      },
    })),
  ];

  const squadSpotlight = players.slice(0, 8);
  const latestNews = news.slice(0, 4);
  const latestGallery = gallery.slice(0, 8);
  const shopPicks = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950">
      {/* Hero Section */}
      {slides.length > 0 && <HeroCarousel slides={slides} />}

      {/* Live Stats Bar */}
      <section className="bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            <div className="text-center py-4 lg:py-6">
              <div className="text-xl lg:text-3xl font-black text-brand-gold">
                15
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Matches
              </div>
            </div>
            <div className="text-center py-4 lg:py-6">
              <div className="text-xl lg:text-3xl font-black text-brand-gold">
                42
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Goals
              </div>
            </div>
            <div className="text-center py-4 lg:py-6">
              <div className="text-xl lg:text-3xl font-black text-brand-gold">
                1st
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Position
              </div>
            </div>
            <div className="text-center py-4 lg:py-6">
              <div className="text-xl lg:text-3xl font-black text-brand-gold">
                12-2-1
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Record
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Mission Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
                <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                Transforming{" "}
                <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                  Lives
                </span>{" "}
                Through Football
              </h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                At Primus FC, we discover, develop, and empower young African
                footballers from underprivileged communities, creating pathways
                where talent meets opportunity.
              </p>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Through structured training, quality education, and personal
                mentorship, we build not just athletes, but leaders and role
                models who give back to society.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-gold text-black font-bold hover:bg-yellow-400 transition-all transform hover:scale-105"
                >
                  Our Story
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white hover:text-black transition-all"
                >
                  Get Involved
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white mb-2">
                    Youth Development
                  </h3>
                  <p className="text-white/70 text-sm">
                    Nurturing young talent from grassroots to professional level
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white mb-2">
                    Community Impact
                  </h3>
                  <p className="text-white/70 text-sm">
                    Creating sustainable development beyond the football pitch
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14v6l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white mb-2">Education First</h3>
                  <p className="text-white/70 text-sm">
                    Combining athletic excellence with academic development
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white mb-2">Global Network</h3>
                  <p className="text-white/70 text-sm">
                    Connecting talent with international opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Fixtures & Results
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              The{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Battle
              </span>{" "}
              Continues
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Follow every moment of our journey to glory
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Next Match */}
            <div>
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Next Match
                </h3>
              </div>
              {upcoming ? (
                <MatchCard
                  date={upcoming.date}
                  competition={upcoming.competition}
                  home={upcoming.home}
                  away={upcoming.away}
                  status={upcoming.status}
                  variant="primary"
                  cta={
                    <a
                      href="/tickets"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full bg-brand-gold text-black font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-brand-gold/30"
                    >
                      Get Tickets
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  }
                />
              ) : (
                <div className="text-center py-8 lg:py-12 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-white/70">
                    No upcoming fixtures scheduled
                  </p>
                </div>
              )}
            </div>

            {/* Last Result */}
            <div>
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Last Result
                </h3>
              </div>
              {recent ? (
                <MatchCard
                  date={recent.date}
                  competition={recent.competition}
                  home={recent.home}
                  away={recent.away}
                  status={recent.status}
                  homeScore={recent.homeScore}
                  awayScore={recent.awayScore}
                  variant="secondary"
                />
              ) : (
                <div className="text-center py-8 lg:py-12 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-white/70">Awaiting first match results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Squad Spotlight */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16">
            <div className="mb-8 lg:mb-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
                <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                  Meet The Squad
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
                Squad{" "}
                <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                  Spotlight
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl">
                The warriors who bring glory to Primus FC
              </p>
            </div>
            <Link
              href="/team"
              className="group inline-flex items-center px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 self-start"
            >
              View Full Squad
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
            {squadSpotlight.map((p: any) => (
              <Link
                key={p.id}
                href={`/team/${p.id}`}
                className="group text-center transform hover:scale-105 transition-all duration-500"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 aspect-[3/4] border border-white/10 group-hover:border-brand-gold/50 transition-colors">
                  <img
                    src={
                      p.photoUrl ??
                      p.photos?.[0]?.url ??
                      "/media/players/mensah-portrait.svg"
                    }
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center text-sm font-black transform group-hover:scale-110 transition-transform">
                    {p.number}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="text-xs font-semibold text-white bg-black/80 rounded-full px-2 py-1 backdrop-blur-sm">
                      {p.position}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm leading-tight group-hover:text-brand-gold transition-colors">
                    {p.name}
                  </div>
                  <div className="text-white/60 text-xs">#{p.number}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News & Media Combined Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Latest News */}
            <div>
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
                    <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                      Club News
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                    Latest{" "}
                    <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                      Updates
                    </span>
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="hidden lg:flex items-center text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
                >
                  All News
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="space-y-6">
                {latestNews.map((n: any, index: number) => (
                  <Link
                    key={n.id}
                    href={`/news/${n.slug}`}
                    className="group block bg-gradient-to-r from-white/5 to-white/0 rounded-3xl p-6 border border-white/10 hover:border-brand-gold/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-gold/10"
                  >
                    <div className="flex items-start gap-4 lg:gap-6">
                      {n.coverUrl && (
                        <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden">
                          <img
                            src={n.coverUrl}
                            alt={n.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-2 mb-2">
                          {n.title}
                        </h3>
                        {n.excerpt && (
                          <p className="text-white/70 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {n.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-white/50">
                          <span>
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                          <span className="mx-2">•</span>
                          <span>Read More</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/news"
                className="lg:hidden mt-8 inline-flex items-center justify-center w-full py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white hover:text-black transition-all"
              >
                View All News
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Media Gallery */}
            <div>
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
                    <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                      Media
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                    Visual{" "}
                    <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                      Story
                    </span>
                  </h2>
                </div>
                <Link
                  href="/media"
                  className="hidden lg:flex items-center text-brand-gold hover:text-yellow-400 transition-colors font-semibold"
                >
                  Gallery
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {latestGallery.map((m: any, index: number) => (
                  <Link
                    key={m.id}
                    href={`/media/${m.id}`}
                    className={`group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:scale-105 ${
                      index === 0 || index === 3
                        ? "aspect-video"
                        : "aspect-square"
                    }`}
                  >
                    <img
                      src={m.type === "video" ? m.posterUrl || m.url : m.url}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {m.type === "video" && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brand-gold/90 grid place-items-center transform group-hover:scale-110 transition-transform shadow-2xl">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="ml-1"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white font-semibold text-sm line-clamp-2 bg-black/80 rounded-xl px-2 lg:px-3 py-1 lg:py-2 backdrop-blur-sm">
                        {m.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/media"
                className="lg:hidden mt-8 inline-flex items-center justify-center w-full py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white hover:text-black transition-all"
              >
                View Gallery
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Store */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Official Store
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Wear The{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Colors
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Official Primus FC merchandise and kits. Every purchase supports
              our youth development programs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {shopPicks.map((p: any) => (
              <div
                key={p.id}
                className="transform hover:scale-105 transition-transform duration-500"
              >
                <ProductCard p={p} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/shop"
              className="group inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-brand-gold text-black font-bold text-base lg:text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
            >
              Explore Full Collection
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-yellow-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-black mb-4 lg:mb-6">
            JOIN THE{" "}
            <span className="bg-gradient-to-r from-black to-slate-800 bg-clip-text text-transparent">
              PRIMUS ARMY
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-black/80 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Be part of our legacy. From the stands to the pitch, your support
            fuels our journey to greatness and helps transform young lives
            through football.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <a
              href="/tickets"
              className="group inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-black text-white font-bold text-base lg:text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Match Tickets
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-white text-black font-bold text-base lg:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Become Member
            </a>
            <a
              href="/shop"
              className="group inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 rounded-full border-2 border-black text-black font-bold text-base lg:text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Shop Merch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
