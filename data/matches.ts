// matches.ts
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
  // Past Matches (FT)
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
    report:
      "Dominant performance from Primus FC with goals from Mensah (2) and Romero securing all three points at home.",
  },
  {
    id: "m-prev-2",
    date: new Date(now.getTime() - 7 * ms).toISOString(),
    competition: "Premier League",
    home: "United Rovers",
    away: "Primus FC",
    venue: "Rovers Arena",
    status: "FT",
    homeScore: 0,
    awayScore: 2,
    report:
      "Clinical away performance with Boateng and Mensah on target. Solid defensive display.",
  },
  {
    id: "m-prev-3",
    date: new Date(now.getTime() - 11 * ms).toISOString(),
    competition: "Cup",
    home: "Primus FC",
    away: "Valley FC",
    venue: "Stadium A",
    status: "FT",
    homeScore: 4,
    awayScore: 0,
    report: "Comprehensive cup victory with goals from four different scorers.",
  },
  {
    id: "m-prev-4",
    date: new Date(now.getTime() - 14 * ms).toISOString(),
    competition: "Premier League",
    home: "Primus FC",
    away: "Northside FC",
    venue: "Stadium A",
    status: "FT",
    homeScore: 1,
    awayScore: 1,
    report: "Hard-fought draw with Romero equalizing in the 85th minute.",
  },

  // Live Match
  {
    id: "m-live-1",
    date: new Date().toISOString(),
    competition: "Premier League",
    home: "Primus FC",
    away: "Eagles FC",
    venue: "Stadium A",
    status: "LIVE",
    homeScore: 1,
    awayScore: 0,
    report:
      "Mensah scored early in the 12th minute. Primus controlling possession.",
  },

  // Future Matches (SCHEDULED)
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
    date: new Date(now.getTime() + 7 * ms).toISOString(),
    competition: "Cup",
    home: "Primus FC",
    away: "Lions",
    venue: "Stadium A",
    status: "SCHEDULED",
  },
  {
    id: "m-next-3",
    date: new Date(now.getTime() + 10 * ms).toISOString(),
    competition: "Premier League",
    home: "South United",
    away: "Primus FC",
    venue: "South Arena",
    status: "SCHEDULED",
  },
  {
    id: "m-next-4",
    date: new Date(now.getTime() + 14 * ms).toISOString(),
    competition: "Premier League",
    home: "Primus FC",
    away: "Western FC",
    venue: "Stadium A",
    status: "SCHEDULED",
  },
  {
    id: "m-next-5",
    date: new Date(now.getTime() + 21 * ms).toISOString(),
    competition: "Cup - Quarter Final",
    home: "Primus FC",
    away: "Metro City",
    venue: "Stadium A",
    status: "SCHEDULED",
  },
];
