'use client'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null); setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      const j = await res.json().catch(()=>({error:'Invalid'}))
      setError(j.error || 'Invalid')
      return
    }
    const next = new URLSearchParams(window.location.search).get('next') || '/admin'
    window.location.href = next
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass rounded-2xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-white/70 text-sm mb-4">Enter admin password</p>
        <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10"
        />
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        <button disabled={loading} className="btn-primary w-full mt-4">{loading?'Signing in…':'Sign in'}</button>
      </form>
    </div>
  )
}
