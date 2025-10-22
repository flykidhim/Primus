"use client";
import { toDate } from "@/lib/datetime";

type Props = {
  date: string | Date; // <— now accepts both
  competition: string;
  home: string;
  away: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  cta?: React.ReactNode;
  className?: string;
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

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-wide text-white/70">
          {competition}
        </div>
        <div className="text-xs text-white/60">{when}</div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-right font-semibold">{home}</div>
        <div className="text-sm text-white/60">vs</div>
        <div className="font-semibold">{away}</div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs rounded-md border border-white/10 px-2 py-0.5">
          {status}
        </div>
        {finished && (
          <div className="text-sm font-bold">
            {homeScore ?? 0} - {awayScore ?? 0}
          </div>
        )}
      </div>

      {cta && <div className="mt-3">{cta}</div>}
    </div>
  );
}
