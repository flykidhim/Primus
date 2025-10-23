// news.ts
export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverUrl?: string;
  category?: string;
  published?: boolean;
  createdAt?: string;
};

const now = new Date();
const ms = 24 * 60 * 60 * 1000;

export const articles: Article[] = [
  {
    id: "a-signing",
    title: "New Signing Announced: Marco Silva Joins Primus FC",
    slug: "new-signing-announced",
    excerpt:
      "We welcome Brazilian midfielder Marco Silva to Primus FC on a three-year deal.",
    content:
      "Primus FC is delighted to announce the signing of Brazilian midfielder Marco Silva from Santos FC. The 24-year-old creative midfielder joins on a three-year contract and will wear the number 10 shirt. Silva is known for his technical ability, vision, and set-piece expertise.",
    coverUrl: "/media/gallery/gallery-1.jpg",
    category: "Transfers",
    published: true,
    createdAt: new Date(now.getTime() - 2 * ms).toISOString(),
  },
  {
    id: "a-report-3-1",
    title: "Match Report: Primus FC 3-1 City United",
    slug: "match-report-3-1-win",
    excerpt: "Dominant home victory for Primus FC with Mensah scoring twice.",
    content:
      "Primus FC continued their impressive home form with a comprehensive 3-1 victory over City United. John Mensah opened the scoring in the 15th minute with a powerful header, before adding a second just before halftime. Luis Romero sealed the victory in the 67th minute with a stunning long-range effort.",
    coverUrl: "/media/gallery/gallery-2.jpg",
    category: "Match Reports",
    published: true,
    createdAt: new Date(now.getTime() - 4 * ms).toISOString(),
  },
  {
    id: "a-injury-update",
    title: "Injury Update: Rodriguez Expected Back Next Month",
    slug: "injury-update-rodriguez",
    excerpt:
      "Positive news on Carlos Rodriguez's recovery from hamstring injury.",
    content:
      "Head coach Mark Thompson provided a positive update on Carlos Rodriguez's recovery timeline. The Spanish defender, who suffered a hamstring strain last month, is expected to return to full training within three weeks and could be available for selection next month.",
    coverUrl: "/media/gallery/gallery-3.jpg",
    category: "Team News",
    published: true,
    createdAt: new Date(now.getTime() - 6 * ms).toISOString(),
  },
  {
    id: "a-academy-success",
    title: "Academy Graduate Signs First Professional Contract",
    slug: "academy-graduate-contract",
    excerpt:
      "18-year-old James Wilson signs his first professional deal with the club.",
    content:
      "Primus FC is proud to announce that academy graduate James Wilson has signed his first professional contract with the club. The 18-year-old forward has impressed with the U23 squad this season, scoring 12 goals in 15 appearances.",
    coverUrl: "/media/gallery/gallery-4.jpg",
    category: "Academy",
    published: true,
    createdAt: new Date(now.getTime() - 8 * ms).toISOString(),
  },
  {
    id: "a-tactical-analysis",
    title: "Tactical Analysis: How Primus FC's Pressing Game Has Evolved",
    slug: "tactical-analysis-pressing",
    excerpt:
      "Deep dive into the tactical evolution under Coach Thompson this season.",
    content:
      "This season has seen Primus FC implement a more aggressive pressing system that has yielded impressive results. We analyze the key changes, player roles, and statistical improvements that have contributed to the team's success.",
    coverUrl: "/media/gallery/gallery-5.jpg",
    category: "Analysis",
    published: true,
    createdAt: new Date(now.getTime() - 12 * ms).toISOString(),
  },
  {
    id: "a-community-outreach",
    title: "Primus FC Launches New Community Football Program",
    slug: "community-football-program",
    excerpt:
      "New initiative aims to provide football opportunities for underprivileged youth.",
    content:
      "Primus FC has launched 'Future Stars', a new community program designed to provide football coaching and equipment to underprivileged children across the city. The program will run weekly sessions and identify talented players for the club's academy.",
    coverUrl: "/media/gallery/gallery-6.jpg",
    category: "Community",
    published: true,
    createdAt: new Date(now.getTime() - 15 * ms).toISOString(),
  },
];
