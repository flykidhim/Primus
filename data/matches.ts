export type Match = {
  id: string;
  date: string;
  competition: string;
  home: string;
  away: string;
  venue?: string;
  status: "SCHEDULED" | "LIVE" | "FT";
  homeScore?: number;
  awayScore?: number;
  report?: string;
};
const now = new Date();
const ms = 24 * 60 * 60 * 1000;
export const matches: Match[] = [
  {
    id: "m-prev-1",
    date: new Date(now.getTime() - 4 * ms).toISOString(),
    competition: "Premier League",
    home: "Primus FC",
    away: "City United",
    venue: "Stadium A",
    status: "FT",
    homeScore: 3,
    awayScore: 1,
    report: "Dominant performance.",
  },
  {
    id: "m-next-1",
    date: new Date(now.getTime() + 3 * ms).toISOString(),
    competition: "Premier League",
    home: "Primus FC",
    away: "Rival FC",
    venue: "Stadium A",
    status: "SCHEDULED",
  },
  {
    id: "m-next-2",
    date: new Date(now.getTime() + 10 * ms).toISOString(),
    competition: "Cup",
    home: "Primus FC",
    away: "Lions",
    venue: "Stadium A",
    status: "SCHEDULED",
  },
];
