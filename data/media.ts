export type MediaItem = {
  id: string;
  title: string;
  type: "photo" | "video";
  url: string; // photo src or video src
  posterUrl?: string; // for videos
  category?: string;
  createdAt: string;
  description?: string;
  tags?: string[];
};
export const media: MediaItem[] = [
  // Photos
  {
    id: "m1",
    title: "Goal Celebration",
    type: "photo",
    url: "/media/gallery/gallery-1.jpg",
    category: "Matchday",
    createdAt: new Date().toISOString(),
    description:
      "A blistering counter-attack ending in a thunderous finish in front of the South Stand.",
    tags: ["goal", "celebration", "matchday"],
  },
  {
    id: "m2",
    title: "Training Session",
    type: "photo",
    url: "/media/gallery/gallery-2.jpg",
    category: "Training",
    createdAt: new Date().toISOString(),
    description: "Sharp rondos and finishing drills at the training ground.",
    tags: ["training", "academy"],
  },
  {
    id: "m3",
    title: "Press Conference",
    type: "photo",
    url: "/media/gallery/gallery-3.jpg",
    category: "Press",
    createdAt: new Date().toISOString(),
    description:
      "Manager speaks on identity, youth, and intensity for the weekend.",
    tags: ["press", "manager"],
  },
  {
    id: "m4",
    title: "Fans",
    type: "photo",
    url: "/media/gallery/gallery-4.jpg",
    category: "Matchday",
    createdAt: new Date().toISOString(),
    description: "Wall of gold and black singing until the final whistle.",
    tags: ["fans", "matchday"],
  },
  // Videos (MP4 + HLS sample)
  {
    id: "v1",
    title: "All Access: Matchday",
    type: "video",
    url: "/media/gallery/vid-1.mp4",
    posterUrl: "/media/gallery/gallery-5.jpg",
    category: "Matchday",
    createdAt: new Date().toISOString(),
    description: "Behind-the-scenes from arrival to the final whistle.",
    tags: ["video", "bts", "matchday"],
  },
  {
    id: "v2",
    title: "Training Highlights",
    type: "video",
    url: "/media/gallery/vid-2.mp4",
    posterUrl: "/media/gallery/gallery-6.jpg",
    category: "Training",
    createdAt: new Date().toISOString(),
    description: "Rondos, finishing drills, and small-sided games.",
    tags: ["video", "training"],
  },
];
