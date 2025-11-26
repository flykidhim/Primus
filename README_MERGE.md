# Primus FC – Full Update Overlay (Admin + Hero + Homepage)

**What you get**
- Homepage with **HeroCarousel** and rich sections
- **Admin** (secure cookie auth + middleware)
  - Players: list/new/edit + gallery (multi-image) using `PlayerImage`
  - Products: list/new/edit + gallery (multi-image) using `ProductImage`
- Small admin CSS helpers (`glass`, `btn-primary`, `btn-outline`)
- `next.config.js` with image host allowlist
- Uses your existing Prisma schema.

## Install
```bash
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

## .env
```
ADMIN_COOKIE_SECRET="a_long_random_string_at_least_32_chars"
ADMIN_PASSWORD_BCRYPT="$2b$10$...your_bcrypt_hash..."
```
Create a hash:
```bash
node -e "const b=require('bcryptjs'); console.log(b.hashSync('admin123',10))"
```

## Run
```bash
pnpm dev
```
Visit `/admin/login` to sign in.
