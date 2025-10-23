// media.ts
export type MediaItem = {
  id: string;
  title: string;
  type: "photo" | "video";
  url: string;
  posterUrl?: string;
  category?: string;
  createdAt: string;
  description?: string;
  tags?: string[];
};

const now = new Date();
const ms = 24 * 60 * 60 * 1000;

export const media: MediaItem[] = [
  // Photos - Matchday
  {
    id: "m1",
    title: "Goal Celebration",
    type: "photo",
    url: "/media/gallery/gallery-1.jpg",
    category: "Matchday",
    createdAt: new Date(now.getTime() - 2 * ms).toISOString(),
    description:
      "A blistering counter-attack ending in a thunderous finish in front of the South Stand.",
    tags: ["goal", "celebration", "matchday", "Mensah"],
  },
  {
    id: "m2",
    title: "Team Huddle",
    type: "photo",
    url: "/media/gallery/gallery-2.jpg",
    category: "Matchday",
    createdAt: new Date(now.getTime() - 3 * ms).toISOString(),
    description: "Captain leading the pre-match huddle before kickoff.",
    tags: ["team", "huddle", "captain", "matchday"],
  },
  {
    id: "m3",
    title: "Defensive Block",
    type: "photo",
    url: "/media/gallery/gallery-3.jpg",
    category: "Matchday",
    createdAt: new Date(now.getTime() - 5 * ms).toISOString(),
    description:
      "Solid defensive organization denying the opposition any clear chances.",
    tags: ["defense", "tackle", "matchday", "Boateng"],
  },

  // Photos - Training
  {
    id: "m4",
    title: "Training Session",
    type: "photo",
    url: "/media/gallery/gallery-4.jpg",
    category: "Training",
    createdAt: new Date(now.getTime() - 1 * ms).toISOString(),
    description: "Sharp rondos and finishing drills at the training ground.",
    tags: ["training", "academy", "drills"],
  },
  {
    id: "m5",
    title: "Set Piece Practice",
    type: "photo",
    url: "/media/gallery/gallery-5.jpg",
    category: "Training",
    createdAt: new Date(now.getTime() - 2 * ms).toISOString(),
    description: "Working on corner routines and free-kick variations.",
    tags: ["training", "set-pieces", "corner"],
  },

  // Photos - Press & Community
  {
    id: "m6",
    title: "Press Conference",
    type: "photo",
    url: "/media/gallery/gallery-6.jpg",
    category: "Press",
    createdAt: new Date(now.getTime() - 1 * ms).toISOString(),
    description:
      "Manager speaks on identity, youth, and intensity for the weekend.",
    tags: ["press", "manager", "conference"],
  },
  {
    id: "m7",
    title: "Fans Support",
    type: "photo",
    url: "/media/gallery/gallery-7.jpg",
    category: "Matchday",
    createdAt: new Date(now.getTime() - 4 * ms).toISOString(),
    description: "Wall of gold and black singing until the final whistle.",
    tags: ["fans", "matchday", "supporters"],
  },
  {
    id: "m8",
    title: "Community Event",
    type: "photo",
    url: "/media/gallery/gallery-8.jpg",
    category: "Community",
    createdAt: new Date(now.getTime() - 8 * ms).toISOString(),
    description:
      "Players visiting local schools as part of community outreach program.",
    tags: ["community", "outreach", "schools"],
  },

  // Videos
  {
    id: "v1",
    title: "All Access: Matchday",
    type: "video",
    url: "/media/gallery/vid-1.mp4",
    posterUrl: "/media/gallery/gallery-9.jpg",
    category: "Matchday",
    createdAt: new Date(now.getTime() - 2 * ms).toISOString(),
    description: "Behind-the-scenes from arrival to the final whistle.",
    tags: ["video", "bts", "matchday", "documentary"],
  },
  {
    id: "v2",
    title: "Training Highlights",
    type: "video",
    url: "/media/gallery/vid-2.mp4",
    posterUrl: "/media/gallery/gallery-10.jpg",
    category: "Training",
    createdAt: new Date(now.getTime() - 3 * ms).toISOString(),
    description: "Rondos, finishing drills, and small-sided games.",
    tags: ["video", "training", "highlights"],
  },
  {
    id: "v3",
    title: "Player Interviews",
    type: "video",
    url: "/media/gallery/vid-3.mp4",
    posterUrl: "/media/gallery/gallery-11.jpg",
    category: "Interviews",
    createdAt: new Date(now.getTime() - 5 * ms).toISOString(),
    description:
      "Post-match reactions from key players after the derby victory.",
    tags: ["video", "interviews", "post-match"],
  },
  {
    id: "v4",
    title: "Season Highlights 23/24",
    type: "video",
    url: "/media/gallery/vid-4.mp4",
    posterUrl: "/media/gallery/gallery-12.jpg",
    category: "Highlights",
    createdAt: new Date(now.getTime() - 10 * ms).toISOString(),
    description:
      "Best moments from the current season including top goals and saves.",
    tags: ["video", "highlights", "season", "goals"],
  },
];
