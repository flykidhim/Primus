// data/staff.ts

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  area?: "Leadership" | "Coaching" | "Technical" | "Medical" | "Operations";
  bio?: string;
  photoUrl?: string;
};

export const staff: StaffMember[] = [
  {
    id: "staff-head-coach",
    name: "DAVID MENSAH",
    role: "Chairman",
    area: "Leadership",
    photoUrl: "/media/staff/staff-1.jpg",
    bio: "Club chairman providing overall vision, direction and strategic leadership for Primus FC. Oversees football and business decisions, driving long-term growth on and off the pitch.",
  },
  {
    id: "team-manager",
    name: "GEORGE ANSAH",
    role: "Team Manager",
    area: "Operations",
    photoUrl: "/media/staff/staff-2.jpg",
    bio: "Handles day-to-day team operations including logistics, matchday coordination and player welfare. Acts as the main link between technical staff, players and club management.",
  },
  {
    id: "technical-director",
    name: "KESTER AMOAH ABEKA",
    role: "Technical Director",
    area: "Technical",
    photoUrl: "/media/staff/staff-3.jpg",
    bio: "Technical Director responsible for the team’s playing style, tactics and training structure. Leads the technical team, designs sessions and makes key decisions on line-ups and game plans.",
  },
];
