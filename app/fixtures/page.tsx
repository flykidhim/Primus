import { getMatches } from "@/lib/repos";
import MatchCard from "@/components/MatchCard";

export const metadata = {
  title: "Fixtures & Results — Primus FC",
  description:
    "View upcoming matches, recent results, and the complete fixture list for Primus FC.",
};

export default async function FixturesPage() {
  const matches = await getMatches();

  // Separate matches into upcoming and past
  const now = new Date();
  const upcomingMatches = matches
    .filter((match: any) => new Date(match.date) > now)
    .sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const pastMatches = matches
    .filter((match: any) => new Date(match.date) <= now)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Get competitions
  const competitions = [
    ...new Set(matches.map((match: any) => match.competition)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Match Schedule
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Fixtures &{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Follow our journey through the season. Never miss a match with our
              complete fixture list and live results.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {matches.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Total Matches
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {upcomingMatches.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Upcoming
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {pastMatches.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Played
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {competitions.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Competitions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Upcoming Matches */}
          {upcomingMatches.length > 0 && (
            <div className="mb-12 lg:mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
                    Upcoming{" "}
                    <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                      Matches
                    </span>
                  </h2>
                  <p className="text-white/70">Next fixtures on the calendar</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/70">
                    {upcomingMatches.length} scheduled
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map((match: any) => (
                  <MatchCard
                    key={match.id}
                    date={match.date}
                    competition={match.competition}
                    home={match.home}
                    away={match.away}
                    status={match.status}
                    homeScore={match.homeScore}
                    awayScore={match.awayScore}
                    variant="primary"
                    cta={
                      <a
                        href="/tickets"
                        className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105"
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
                ))}
              </div>
            </div>
          )}

          {/* Recent Results */}
          {pastMatches.length > 0 && (
            <div className="mb-12 lg:mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
                    Recent{" "}
                    <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                      Results
                    </span>
                  </h2>
                  <p className="text-white/70">
                    Latest match outcomes and performances
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-white/70">
                    {pastMatches.length} completed
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastMatches.slice(0, 6).map((match: any) => (
                  <MatchCard
                    key={match.id}
                    date={match.date}
                    competition={match.competition}
                    home={match.home}
                    away={match.away}
                    status={match.status}
                    homeScore={match.homeScore}
                    awayScore={match.awayScore}
                    variant="secondary"
                  />
                ))}
              </div>

              {pastMatches.length > 6 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-3 rounded-full border-2 border-white/20 text-white font-semibold hover:bg-white hover:text-black transition-all">
                    Load More Results
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Competition Breakdown */}
          <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-slate-800 to-purple-900/30 border border-white/10">
            <h3 className="text-2xl font-black text-white mb-6 text-center">
              Competition Overview
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {competitions.map((competition) => {
                const compMatches = matches.filter(
                  (m: any) => m.competition === competition
                );
                const upcoming = compMatches.filter(
                  (m: any) => new Date(m.date) > now
                ).length;
                const completed = compMatches.filter(
                  (m: any) => new Date(m.date) <= now
                ).length;

                return (
                  <div
                    key={competition}
                    className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="text-sm text-white/70 mb-2">
                      {competition}
                    </div>
                    <div className="text-2xl font-black text-brand-gold mb-1">
                      {compMatches.length}
                    </div>
                    <div className="text-xs text-white/60">
                      {upcoming} upcoming • {completed} played
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empty State */}
          {matches.length === 0 && (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Fixtures Scheduled
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                The fixture list for the upcoming season is being prepared.
                Check back soon for match schedules and ticket information.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
              Never Miss a{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Match
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get live updates, match highlights, and exclusive content
              delivered straight to your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tickets"
                className="inline-flex items-center px-8 py-4 rounded-full bg-brand-gold text-black font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
              >
                Buy Match Tickets
                <svg
                  className="w-5 h-5 ml-2"
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
                href="/news"
                className="inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Match Reports
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
