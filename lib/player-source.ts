// /lib/player-source.ts
export type PlayerPhoto = {
  id?: string;
  url: string;
  alt?: string;
  sort?: number;
};
export type Player = {
  id: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW" | string;
  number: number;
  nationality?: string;
  heightCm?: number;
  bio?: string;
  photoUrl?: string;
  appearances: number;
  goals: number;
  assists: number;
  photos?: PlayerPhoto[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function loadPlayersModule(): Promise<any> {
  return import("@/data/players");
}

function normalize(raw: any, i: number): Player {
  const name = raw?.name ?? raw?.fullName ?? "";
  const id = raw?.id ?? raw?.slug ?? (name ? `p-${slugify(name)}` : `p-${i}`);
  const photosRaw: any[] = raw?.photos ?? raw?.gallery ?? raw?.images ?? [];

  return {
    id,
    name,
    position: raw?.position ?? raw?.pos ?? "MF",
    number: Number(raw?.number ?? raw?.no ?? 0),
    nationality: raw?.nationality ?? raw?.country ?? undefined,
    heightCm: raw?.heightCm ?? raw?.height ?? undefined,
    bio: raw?.bio ?? raw?.about ?? undefined,
    photoUrl: raw?.photoUrl ?? raw?.image ?? raw?.photo ?? undefined,
    appearances: Number(raw?.appearances ?? raw?.gp ?? 0),
    goals: Number(raw?.goals ?? 0),
    assists: Number(raw?.assists ?? 0),
    photos: Array.isArray(photosRaw)
      ? photosRaw
          .map((ph, idx) => ({
            id: ph?.id ?? `${id}-ph-${idx}`,
            url: ph?.url ?? ph?.src ?? "",
            alt: ph?.alt ?? name,
            sort: typeof ph?.sort === "number" ? ph.sort : idx,
          }))
          .filter((ph) => !!ph.url)
          .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
      : undefined,
  };
}

export async function getAllPlayers(): Promise<Player[]> {
  const mod = await loadPlayersModule();
  const raw: any[] =
    (Array.isArray(mod.players) && mod.players) ||
    (Array.isArray(mod.default) && mod.default) ||
    (Array.isArray(mod.squad) && mod.squad) ||
    (Array.isArray(mod.roster) && mod.roster) ||
    [];
  return raw.map(normalize);
}

export async function getPlayersFiltered(pos?: string, q?: string) {
  let list = await getAllPlayers();
  if (pos && ["GK", "DF", "MF", "FW"].includes(pos))
    list = list.filter((p) => p.position === pos);
  if (q && q.trim()) {
    const s = q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        String(p.number).includes(s) ||
        (p.nationality ?? "").toLowerCase().includes(s) ||
        (p.bio ?? "").toLowerCase().includes(s)
    );
  }
  list.sort((a, b) => a.number - b.number);
  return list;
}

export async function getPlayerById(id: string) {
  const list = await getAllPlayers();
  return list.find((p) => p.id === id) ?? null;
}
