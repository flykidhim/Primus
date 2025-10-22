export type Player = {
  id: string;
  name: string;
  position: string;
  number: number;
  nationality?: string;
  heightCm?: number;
  bio?: string;
  photoUrl?: string;
  appearances: number;
  goals: number;
  assists: number;
  photos?: { id: string; url: string; alt?: string; sort?: number }[];
};
export const players: Player[] = [
  {
    id: "p-mensah",
    name: "John Mensah",
    position: "FW",
    number: 9,
    nationality: "GHA",
    heightCm: 182,
    bio: "Prolific striker with a lethal right foot.",
    photoUrl: "/media/players/player-1.jpg",
    appearances: 24,
    goals: 15,
    assists: 5,
    photos: [
      { id: "pm1", url: "/media/players/mensah-portrait.svg", sort: 0 },
      { id: "pm2", url: "/media/players/mensah-action-1.svg", sort: 1 },
    ],
  },
  {
    id: "p-romero",
    name: "Luis Romero",
    position: "MF",
    number: 8,
    nationality: "ESP",
    heightCm: 176,
    bio: "Creative playmaker with elite vision.",
    photoUrl: "/media/players/player-4.jpg",
    appearances: 29,
    goals: 7,
    assists: 12,
    photos: [
      { id: "pr1", url: "/media/players/romero-portrait.svg", sort: 0 },
      { id: "pr2", url: "/media/players/player-2.jpg", sort: 1 },
    ],
  },
  {
    id: "p-boateng",
    name: "Samuel Boateng",
    position: "DF",
    number: 5,
    nationality: "GHA",
    heightCm: 188,
    bio: "Rock at the back with composure and strength.",
    photoUrl: "/media/players/player-3.jpg",
    appearances: 31,
    goals: 2,
    assists: 1,
  },
];
