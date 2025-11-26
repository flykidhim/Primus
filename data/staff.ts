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
    role: "Head Coach",
    area: "Coaching",
    photoUrl: "/media/staff/staff-1.jpg",
    bio: "Leads the first team with an attacking philosophy and strong focus on youth development.",
  },
  {
    id: "staff-assistant-coach",
    name: "Emmanuel Owusu",
    role: "Assistant Coach",
    area: "Coaching",
    photoUrl: "/media/staff/staff-2.jpg",
    bio: "Supports training design, match preparation, and individual player growth.",
  },
  {
    id: "staff-goalkeeping-coach",
    name: "Yaw Boateng",
    role: "Goalkeeping Coach",
    area: "Technical",
    photoUrl: "/media/staff/staff-3.jpg",
    bio: "Specialist coach focused on modern, ball-playing goalkeepers.",
  },
  //   {
  //     id: "staff-fitness-coach",
  //     name: "Sarah Addo",
  //     role: "Strength & Conditioning Coach",
  //     area: "Medical",
  //     photoUrl: "/brand/primus-logo.png",
  //     bio: "Oversees physical performance, recovery, and injury prevention.",
  //   },
  //   {
  //     id: "staff-team-manager",
  //     name: "Daniel Kusi",
  //     role: "Team Manager",
  //     area: "Operations",
  //     photoUrl: "/brand/primus-logo.png",
  //     bio: "Coordinates logistics, fixtures, and daily team operations.",
  //   },
  //   {
  //     id: "staff-academy-director",
  //     name: "Akosua Amponsah",
  //     role: "Academy Director",
  //     area: "Leadership",
  //     photoUrl: "/media/staff/staff-1.jpg",
  //     bio: "Leads the academy pathway and community-based talent identification.",
  //   },
];
