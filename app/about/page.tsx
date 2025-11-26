import Image from "next/image";
import { getStaff } from "@/lib/repos";

export const metadata = {
  title: "About — Primus FC",
  description:
    "Discover the story, mission, vision, and people behind Primus FC - more than a football club, a movement for change.",
};

export default async function AboutPage() {
  const staff = await getStaff();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              More Than{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                A Club
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A movement of hope, opportunity, and transformation. We're
              building world-class footballers and responsible global citizens
              who uplift their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Mission */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
                  <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                  Transforming{" "}
                  <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                    Lives
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  At Primus Football Club, we believe that great talent can rise
                  from anywhere, even from the most overlooked and
                  underprivileged corners of our communities.
                </p>
                <p>
                  Our mission is to discover, develop, and empower young African
                  footballers, especially those growing up in slums and rural
                  areas, and help them step boldly into the future they dream
                  of.
                </p>
                <p>
                  For many of these young people, football is not just a sport.
                  It is a lifeline, a language, and a bridge to a better life.
                  We are committed to creating pathways where talent meets
                  opportunity.
                </p>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">50+</div>
                  <div className="text-xs text-white/70 mt-1">
                    Youth Developed
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">3</div>
                  <div className="text-xs text-white/70 mt-1">Communities</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">
                    100%
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    Education Focus
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-purple-900/30 border border-white/10">
                <h3 className="text-2xl font-black text-white mb-4">
                  Our Vision
                </h3>
                <div className="space-y-4 text-white/80">
                  <p>
                    To build a world-class football and business brand that not
                    only raises stars but raises communities. We aspire to
                    become a beacon of hope for underprivileged youth.
                  </p>
                  <p>
                    We envision a future where rural and inner city communities
                    thrive because their children have access to world-class
                    training, quality education, and meaningful opportunities.
                  </p>
                  <p>
                    Through football, we aim to create jobs, spark innovation,
                    and inspire entrepreneurship, turning passion into a force
                    for sustainable development.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-brand-gold/20 to-brand-blue/20 border border-brand-gold/30">
                  <div className="text-sm text-brand-gold font-semibold uppercase tracking-wider">
                    Our Promise
                  </div>
                  <div className="text-lg font-black text-white mt-1">
                    Raise stars. Raise communities.
                  </div>
                </div>
              </div>

              {/* Approach */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-brand-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-1">
                    Education First
                  </h4>
                  <p className="text-sm text-white/70">
                    Academic excellence alongside athletic training
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-brand-gold"
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
                  <h4 className="font-semibold text-white mb-1">
                    Community Impact
                  </h4>
                  <p className="text-sm text-white/70">
                    Creating sustainable development beyond football
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches & Staff */}
      <section className="py-16 lg:py-24 bg-slate-950/70 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Behind The Team
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Coaches &{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Staff
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              The people who design the sessions, manage the details, and make
              sure Primus FC runs at a professional standard every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {staff.map((s) => (
              <div
                key={s.id}
                className="group rounded-3xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] bg-slate-900">
                  <Image
                    src={s.photoUrl || "/brand/primus-logo.png"}
                    alt={s.name}
                    fill
                    className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs font-semibold text-white/70 mb-1">
                      {s.area || "Staff"}
                    </div>
                    <div className="text-lg font-black text-white">
                      {s.name}
                    </div>
                    <div className="text-xs font-medium text-brand-gold">
                      {s.role}
                    </div>
                  </div>
                </div>
                {s.bio && (
                  <div className="p-4 lg:p-5 text-sm text-white/70">
                    {s.bio}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Identity */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Our Heritage
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Building{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Legacy
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Club Identity */}
            <div className="space-y-6">
              <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold to-yellow-400 p-3">
                    <Image
                      src="/brand/primus-logo.png"
                      alt="Primus FC"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Primus FC
                    </h3>
                    <p className="text-white/70">
                      Founded 2025 — Gold & Black since day one
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-brand-gold mb-2">
                      Identity
                    </h4>
                    <p className="text-white/80">
                      Our crest blends a classic ball with a golden wreath,
                      reflecting ambition and excellence. The palette is{" "}
                      <b className="text-brand-gold">gold</b>, <b>black</b>, and
                      crisp <b>white</b>, with a diamond-blue accent symbolizing
                      hope and clarity.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-gold mb-2">
                      Philosophy
                    </h4>
                    <p className="text-white/80">
                      To build the most connected, community-driven football
                      club in the region — academy first, bold football on the
                      pitch, and transformative impact off it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white mb-6">
                Our Journey
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center">
                    <span className="text-black font-black text-sm">2025</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Foundation & Inaugural Season
                    </h4>
                    <p className="text-white/70 text-sm">
                      Club founded with a vision for social impact. First
                      academy trials launched in underserved communities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-black text-sm">
                      2026
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Infrastructure Development
                    </h4>
                    <p className="text-white/70 text-sm">
                      Stadium renovation phase 1 completed. Digital membership
                      platform launched, connecting global supporters.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-black text-sm">
                      2027
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Competitive Breakthrough
                    </h4>
                    <p className="text-white/70 text-sm">
                      Youth Cup finalists achievement. First continental tour
                      establishing international pathways for talent.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-black text-sm">
                      Future
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Sustainable Impact
                    </h4>
                    <p className="text-white/70 text-sm">
                      Expanding to 10+ communities. Establishing the Primus
                      Foundation for education and social development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Join The Movement
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
              Be Part of{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Something Bigger
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Together, we can transform lives through football. Your support
              creates opportunities where they're needed most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full bg-brand-gold text-black font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
              >
                Partner With Us
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
                href="/team"
                className="inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Meet Our Players
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
