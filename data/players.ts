// players.ts
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
    bio: "Prolific striker with a lethal right foot. Joined from Accra United in 2022 and has been the club's top scorer for two consecutive seasons. Known for his aerial ability and clinical finishing.",
    photoUrl: "/media/players/player-1.jpg",
    appearances: 24,
    goals: 15,
    assists: 5,
    photos: [
      {
        id: "pm1",
        url: "/media/players/mensah-portrait.svg",
        alt: "John Mensah portrait",
        sort: 0,
      },
      {
        id: "pm2",
        url: "/media/players/mensah-action-1.svg",
        alt: "John Mensah in action",
        sort: 1,
      },
      {
        id: "pm3",
        url: "/media/players/mensah-celebration.jpg",
        alt: "Goal celebration",
        sort: 2,
      },
    ],
  },
  {
    id: "p-romero",
    name: "Luis Romero",
    position: "MF",
    number: 8,
    nationality: "ESP",
    heightCm: 176,
    bio: "Creative playmaker with elite vision and passing range. Captain and heartbeat of the team. Former Barcelona academy product who brings technical excellence and leadership.",
    photoUrl: "/media/players/player-4.jpg",
    appearances: 29,
    goals: 7,
    assists: 12,
    photos: [
      {
        id: "pr1",
        url: "/media/players/romero-portrait.svg",
        alt: "Luis Romero portrait",
        sort: 0,
      },
      {
        id: "pr2",
        url: "/media/players/player-2.jpg",
        alt: "Luis Romero in midfield",
        sort: 1,
      },
    ],
  },
  {
    id: "p-boateng",
    name: "Samuel Boateng",
    position: "DF",
    number: 5,
    nationality: "GHA",
    heightCm: 188,
    bio: "Rock at the back with composure and strength. Dominant in aerial duels and excellent reading of the game. Vice-captain and defensive organizer.",
    photoUrl: "/media/players/player-3.jpg",
    appearances: 31,
    goals: 2,
    assists: 1,
    photos: [
      {
        id: "pb1",
        url: "/media/players/boateng-portrait.svg",
        alt: "Samuel Boateng portrait",
        sort: 0,
      },
      {
        id: "pb2",
        url: "/media/players/boateng-tackle.jpg",
        alt: "Defensive tackle",
        sort: 1,
      },
    ],
  },
  {
    id: "p-wilson",
    name: "James Wilson",
    position: "FW",
    number: 19,
    nationality: "ENG",
    heightCm: 179,
    bio: "Academy graduate with electric pace and intelligent movement. Recently promoted to the first team after impressive performances with the U23 squad.",
    photoUrl: "/media/players/player-5.jpg",
    appearances: 8,
    goals: 2,
    assists: 3,
  },
  {
    id: "p-rodriguez",
    name: "Carlos Rodriguez",
    position: "DF",
    number: 3,
    nationality: "ESP",
    heightCm: 175,
    bio: "Attacking left-back known for his crossing ability and overlapping runs. Provides width and creativity from defensive positions.",
    photoUrl: "/media/players/player-6.jpg",
    appearances: 22,
    goals: 1,
    assists: 6,
  },
  {
    id: "p-chen",
    name: "Wei Chen",
    position: "GK",
    number: 1,
    nationality: "CHN",
    heightCm: 192,
    bio: "Agile shot-stopper with excellent reflexes and command of his area. Joined from Shanghai FC and has kept 12 clean sheets this season.",
    photoUrl: "/media/players/player-7.jpg",
    appearances: 28,
    goals: 0,
    assists: 0,
  },
  {
    id: "p-muller",
    name: "Thomas Muller",
    position: "MF",
    number: 6,
    nationality: "GER",
    heightCm: 184,
    bio: "Defensive midfielder who breaks up opposition play and starts attacks. Excellent positioning and tactical discipline.",
    photoUrl: "/media/players/player-8.jpg",
    appearances: 26,
    goals: 3,
    assists: 4,
  },
  {
    id: "p-silva",
    name: "Marco Silva",
    position: "MF",
    number: 10,
    nationality: "BRA",
    heightCm: 178,
    bio: "New signing from Santos FC. Creative midfielder with exceptional technical skills and vision. Expected to add creativity to the attacking third.",
    photoUrl: "/media/players/player-9.jpg",
    appearances: 0,
    goals: 0,
    assists: 0,
  },
];
