'use client'
import { useState } from 'react'

export default function GalleryManager({ productId, images }: { productId: string; images: any[] }) {
  const [list, setList] = useState(images)
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [sort, setSort] = useState( list.length )

  async function add() {
    if(!url) return
    const p = await fetch(`/api/admin/products/${productId}/images`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ url, alt, sort }),
    }).then(r=>r.json())
    setList((s)=>[...s, p.image])
    setUrl(''); setAlt('')
  }

  async function remove(imageId: string) {
    if(!confirm('Remove image?')) return
    const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, { method:'DELETE' })
    if(res.ok) setList((s)=>s.filter(x=>x.id!==imageId))
  }

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Images</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {list.map(im=>(
            <div key={im.id} className="relative rounded-xl overflow-hidden border border-white/10">
              <img src={im.url} alt={im.alt || ''} className="w-full h-40 object-cover" />
              <div className="p-2 text-xs flex items-center justify-between bg-black/40">
                <span>sort: {im.sort}</span>
                <button onClick={()=>remove(im.id)} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-2">
          <label className="grid gap-1">
            <span className="text-sm text-white/70">Image URL</span>
            <input value={url} onChange={(e)=>setUrl(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"/>
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-white/70">Alt text</span>
            <input value={alt} onChange={(e)=>setAlt(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"/>
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-white/70">Sort</span>
            <input type="number" value={sort} onChange={(e)=>setSort(Number(e.target.value))} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"/>
          </label>
          <button onClick={add} className="btn-primary">Add Image</button>
          <p className="text-xs text-white/60">Tip: use <code>placehold.co</code></p>
        </div>
      </div>
    </div>
  )
}
