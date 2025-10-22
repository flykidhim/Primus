import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPlayersPage() {
  const players = await prisma.player.findMany({ orderBy: { number: 'asc' } })
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Players</h1>
        <Link href="/admin/players/new" className="btn-primary">Add Player</Link>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Pos</th>
              <th className="p-3 text-left">Apps</th>
              <th className="p-3 text-left">Goals</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {players.map(p=>(
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">{p.number}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.position}</td>
                <td className="p-3">{p.appearances}</td>
                <td className="p-3">{p.goals}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/players/${p.id}`} className="btn-outline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
