import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ArticleAdmin() {
  const items = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="py-8 space-y-6">
      <h1 className="text-3xl font-bold">Article</h1>
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
        <h2 className="font-semibold mb-2">Create Article</h2>
        <form action="/api/admin/article/create" method="post" className="grid md:grid-cols-2 gap-3">
          <input name="title" placeholder="title" className="border rounded-xl px-3 py-2" /><input name="slug" placeholder="slug" className="border rounded-xl px-3 py-2" /><input name="excerpt" placeholder="excerpt" className="border rounded-xl px-3 py-2" /><input name="coverUrl" placeholder="coverUrl" className="border rounded-xl px-3 py-2" /><input name="category" placeholder="category" className="border rounded-xl px-3 py-2" /><input name="content" placeholder="content" className="border rounded-xl px-3 py-2" />
          <button className="px-3 py-2 rounded-xl bg-primary text-white md:col-span-2">Create</button>
        </form>
      </div>
    </div>
  )
}

function getTitle(i: any) {
  return i.name || i.title || i.slug || i.id;
}
