import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MatchAdmin() {
  const items = await prisma.match.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="py-8 space-y-6">
      <h1 className="text-3xl font-bold">Match</h1>
      <Link href="/admin" className="text-sm underline">← Back</Link>
      <div className="grid gap-2">
        {items.map(i => (
          <div key={i.id} className="rounded-2xl border p-4">
            <div className="font-semibold">{getTitle(i)}</div>
            <div className="text-xs text-gray-500">{i.id}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border p-4">
        <h2 className="font-semibold mb-2">Create Match</h2>
        <form action="/api/admin/match/create" method="post" className="grid md:grid-cols-2 gap-3">
          <input name="date" placeholder="date" className="border rounded-xl px-3 py-2" /><input name="competition" placeholder="competition" className="border rounded-xl px-3 py-2" /><input name="home" placeholder="home" className="border rounded-xl px-3 py-2" /><input name="away" placeholder="away" className="border rounded-xl px-3 py-2" /><input name="venue" placeholder="venue" className="border rounded-xl px-3 py-2" /><input name="status" placeholder="status" className="border rounded-xl px-3 py-2" /><input name="homeScore" placeholder="homeScore" className="border rounded-xl px-3 py-2" /><input name="awayScore" placeholder="awayScore" className="border rounded-xl px-3 py-2" /><input name="report" placeholder="report" className="border rounded-xl px-3 py-2" />
          <button className="px-3 py-2 rounded-xl bg-primary text-white md:col-span-2">Create</button>
        </form>
      </div>
    </div>
  )
}

function getTitle(i: any) {
  return i.name || i.title || i.slug || i.id;
}
