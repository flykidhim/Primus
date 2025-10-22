# Football Club — Next.js App (v2)

World-class starter for a professional football club website built with **Next.js (App Router)**, **Tailwind CSS**, and **Prisma (Postgres)**.

## Highlights
- Stunning UI components (Hero, PlayerCard, MatchCard, Countdown, LeagueTable, NewsCard)
- Fan pages: Home, Team & Player profiles, Fixtures & Results, News, History, Shop, Media, Contact
- Admin: login + dashboard; CRUD for Players/Matches/Articles/Products/Media, **with edit/delete for Players**
- Idempotent rich seed: more players, matches, news, products, media, standings
- Neon-friendly Prisma config (`DATABASE_URL` pooled + `DIRECT_URL` unpooled)

## Quick Start
```bash
pnpm install
cp .env.example .env  # fill DATABASE_URL + DIRECT_URL + secrets
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```
Admin login: go to `/admin/login` and use password that matches your `ADMIN_PASSWORD_BCRYPT` (default is hash of **admin123**).

## Add more player images
- In Admin → Players → **Create Player**, paste any image URL into **Photo URL**.
- Or update via **Edit** on a player row.
- Suggested placeholders (portrait/action): use https://images.unsplash.com/* photos or https://placehold.co/1600x900?text=Player

## Design tweaks
- Change brand colors in **tailwind.config.ts** (`primary`, `secondary`, `gold`).
- Update Hero background in `components/Hero.tsx` (replace the Unsplash URL).
- Player grid uses `PlayerCard` with jersey/position chip + subtle gradients.

© 2025
