import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="btn-primary">Add Product</Link>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{(p.priceCents/100).toLocaleString(undefined,{style:'currency',currency:'USD'})}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="btn-outline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
