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
    name: "Kofi Mensah",
    role: "Chairman",
    area: "Leadership",
    photoUrl: "/media/staff/staff-1.jpg",
    bio: "Club chairman providing overall vision, direction and strategic leadership for Primus FC. Oversees football and business decisions, driving long-term growth on and off the pitch.",
  },
  {
    id: "staff-assistant-coach",
    name: "Emmanuel Owusu",
    role: "Team Manager",
    area: "Operations",
    photoUrl: "/media/staff/staff-2.jpg",
    bio: "Handles day-to-day team operations including logistics, matchday coordination and player welfare. Acts as the main link between technical staff, players and club management.",
  },
  {
    id: "staff-goalkeeping-coach",
    name: "Yaw Boateng",
    role: "Head Coach",
    area: "Technical",
    photoUrl: "/media/staff/staff-3.jpg",
    bio: "Head coach responsible for the team’s playing style, tactics and training structure. Leads the technical team, designs sessions and makes key decisions on line-ups and game plans.",
  },
];
