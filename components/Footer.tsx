export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container py-8 text-sm flex flex-col sm:flex-row gap-3 justify-between">
        <p>© {new Date().getFullYear()} Primus FC. All rights reserved.</p>
        <p>Built with Next.js • Tailwind • Prisma</p>
      </div>
    </footer>
  );
}
