// app/admin/staff/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StaffAdminPage() {
  const staff = await prisma.staff.findMany({
    orderBy: [{ area: "asc" }, { name: "asc" }],
  });

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff & Coaches</h1>
          <p className="text-sm text-white/60">
            Manage leadership, coaching, and backroom staff profiles.
          </p>
        </div>
        <Link href="/admin" className="text-sm underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* List existing staff */}
      <div className="grid gap-3">
        {staff.map((s) => (
          <div
            key={s.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center gap-4">
              {s.photoUrl && (
                <img
                  src={s.photoUrl}
                  alt={s.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
              )}
              <div>
                <div className="font-semibold text-white">{s.name}</div>
                <div className="text-sm text-brand-gold">{s.role}</div>
                {s.area && (
                  <div className="text-xs text-white/60 mt-1">{s.area}</div>
                )}
              </div>
            </div>
            <form
              action="/api/admin/staff/delete"
              method="post"
              className="self-stretch md:self-center"
            >
              <input type="hidden" name="id" value={s.id} />
              <button className="px-3 py-2 rounded-xl border border-red-500/60 text-red-300 text-xs hover:bg-red-500/10">
                Delete
              </button>
            </form>
          </div>
        ))}
        {staff.length === 0 && (
          <p className="text-sm text-white/60">
            No staff members yet. Use the form below to add your first coach /
            staff.
          </p>
        )}
      </div>

      {/* Create staff form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
        <h2 className="font-semibold mb-2 text-white">Add Staff Member</h2>
        <p className="text-xs text-white/60 mb-4">
          Basic details are enough to show on About & Home page sections.
        </p>
        <form
          action="/api/admin/staff/create"
          method="post"
          className="grid md:grid-cols-2 gap-3"
        >
          <input
            name="name"
            placeholder="Full name"
            required
            className="border rounded-xl px-3 py-2 bg-black/30 border-white/20 text-sm"
          />
          <input
            name="role"
            placeholder="Role (e.g. Head Coach)"
            required
            className="border rounded-xl px-3 py-2 bg-black/30 border-white/20 text-sm"
          />
          <input
            name="area"
            placeholder="Area (Leadership / Coaching / Technical / Medical / Operations)"
            className="border rounded-xl px-3 py-2 bg-black/30 border-white/20 text-sm md:col-span-2"
          />
          <input
            name="photoUrl"
            placeholder="Photo URL (optional)"
            className="border rounded-xl px-3 py-2 bg-black/30 border-white/20 text-sm md:col-span-2"
          />
          <textarea
            name="bio"
            placeholder="Short bio (optional)"
            rows={3}
            className="border rounded-xl px-3 py-2 bg-black/30 border-white/20 text-sm md:col-span-2"
          />
          <button className="px-4 py-2 rounded-xl bg-brand-gold text-black font-semibold text-sm md:col-span-2">
            Create Staff Member
          </button>
        </form>
      </div>
    </div>
  );
}
