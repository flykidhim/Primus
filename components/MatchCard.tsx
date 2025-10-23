"use client";
import { toDate } from "@/lib/datetime";

type Props = {
  date: string | Date;
  competition: string;
  home: string;
  away: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  cta?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function MatchCard({
  date,
  competition,
  home,
  away,
  status,
  homeScore,
  awayScore,
  cta,
  className = "",
  variant = "primary",
}: Props) {
  const d = toDate(date);
  const when = d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const finished =
    status === "FT" || status === "FULL_TIME" || status === "FINISHED";

  const isPrimary = variant === "primary";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 ${
        isPrimary
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 border border-purple-500/20"
          : "bg-white/5 backdrop-blur-sm border border-white/10"
      } ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isPrimary ? "bg-brand-gold animate-pulse" : "bg-red-500"
              }`}
            ></div>
            <div className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {competition}
            </div>
          </div>
          <div className="text-xs text-white/60 font-medium">{when}</div>
        </div>

        {/* Teams & Score */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-8 mb-6">
          {/* Home Team */}
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-white mb-2">
              {home}
            </div>
            {finished && (
              <div
                className={`text-2xl lg:text-3xl font-black ${
                  isPrimary ? "text-brand-gold" : "text-white"
                }`}
              >
                {homeScore ?? 0}
              </div>
            )}
          </div>

          {/* VS Center */}
          <div className="flex flex-col items-center">
            {finished ? (
              <div className="text-lg font-bold text-white/70">-</div>
            ) : (
              <div className="relative">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-white/70">VS</span>
                </div>
                {isPrimary && (
                  <div className="absolute inset-0 rounded-full border-2 border-brand-gold/50 animate-ping"></div>
                )}
              </div>
            )}
            <div className="text-xs text-white/50 mt-2 hidden sm:block">
              {status}
            </div>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <div className="text-lg lg:text-xl font-bold text-white mb-2">
              {away}
            </div>
            {finished && (
              <div
                className={`text-2xl lg:text-3xl font-black ${
                  isPrimary ? "text-brand-gold" : "text-white"
                }`}
              >
                {awayScore ?? 0}
              </div>
            )}
          </div>
        </div>

        {/* Status & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                finished
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
              }`}
            >
              {finished ? "COMPLETED" : "UPCOMING"}
            </div>
            <div className="text-sm text-white/60 sm:hidden">{status}</div>
          </div>

          {cta && <div className="w-full sm:w-auto">{cta}</div>}
        </div>
      </div>
    </div>
  );
}
