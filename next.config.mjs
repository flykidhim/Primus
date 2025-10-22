/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true }, // ← skip ESLint in `next build`
  typescript: { ignoreBuildErrors: false }, // keep TS checks
};

export default nextConfig;
// or: module.exports = nextConfig;
