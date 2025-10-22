import { prisma } from "@/lib/prisma";
export default async function LeagueTable() {
  const standings = await prisma.standing.findMany({
    orderBy: { position: "asc" },
  });
  if (!standings.length) return null;
  return (
    <div className="overflow-auto rounded-2xl border">
      <table className="min-w-[640px] w-full text-xs sm:text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left">
            {["Pos", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map(
              (h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {standings.map((s) => (
            <tr key={s.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-3 py-2">{s.position}</td>
              <td className="px-3 py-2">{s.team}</td>
              <td className="px-3 py-2">{s.played}</td>
              <td className="px-3 py-2">{s.won}</td>
              <td className="px-3 py-2">{s.drawn}</td>
              <td className="px-3 py-2">{s.lost}</td>
              <td className="px-3 py-2">{s.gf}</td>
              <td className="px-3 py-2">{s.ga}</td>
              <td className="px-3 py-2">{s.gd}</td>
              <td className="px-3 py-2 font-semibold">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
