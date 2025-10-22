import { getMatches } from "@/lib/repos";
import MatchCard from "@/components/MatchCard";
export const metadata = { title: "Fixtures — Primus FC" };
export default async function FixturesPage() {
  const matches = await getMatches();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Fixtures & Results</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((m: any) => (
          <MatchCard
            key={m.id}
            date={m.date}
            competition={m.competition}
            home={m.home}
            away={m.away}
            status={m.status}
            homeScore={m.homeScore}
            awayScore={m.awayScore}
          />
        ))}
      </div>
      {matches.length === 0 && (
        <p className="text-white/70">No fixtures yet.</p>
      )}
    </div>
  );
}
