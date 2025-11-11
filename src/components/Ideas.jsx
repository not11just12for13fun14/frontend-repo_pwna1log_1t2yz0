import { useEffect, useState } from 'react'

export default function Ideas(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [ideas, setIdeas] = useState([])
  const [form, setForm] = useState({ title:'', description:'', category:'mobility', location:'', tags:'' })

  const load = async () => {
    const res = await fetch(`${baseUrl}/api/ideas`)
    const json = await res.json()
    setIdeas(json.items)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t=>t.trim()) : [] }
    await fetch(`${baseUrl}/api/ideas`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    setForm({ title:'', description:'', category:'mobility', location:'', tags:'' })
    load()
  }

  return (
    <section className="min-h-screen bg-[#0b0c14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold">Citizen Collaboration</h2>
        <p className="text-white/70">Share ideas, report issues, and upvote proposals.</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {ideas.map(i => (
              <div key={i._id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{i.title}</h3>
                  <span className="text-sm px-2 py-1 rounded bg-[#00F5A8] text-black">{i.votes ?? 0} votes</span>
                </div>
                <p className="text-white/70 mt-1">{i.description}</p>
                <div className="mt-2 text-xs text-white/60">#{i.category} {i.tags?.map(t => <span key={t} className="ml-2">{t}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Submit an Idea</h3>
            <form onSubmit={submit} className="mt-3 space-y-3">
              <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" required />
              <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" rows={3} required />
              <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2">
                <option value="mobility">Mobility</option>
                <option value="energy">Energy</option>
                <option value="waste">Waste</option>
                <option value="air">Air</option>
              </select>
              <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" />
              <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} placeholder="Tags (comma-separated)" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" />
              <button className="w-full px-4 py-2 rounded-md bg-[#00F5A8] text-black font-semibold">Save Idea</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
