import { useEffect, useMemo, useState } from 'react'

export default function DataHub(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/datasets`).then(r=>r.json()).then(setItems)
  }, [])

  const filtered = useMemo(() => {
    return (items||[]).filter(d =>
      (cat==='all' || d.category===cat) &&
      (q==='' || d.name.toLowerCase().includes(q.toLowerCase()) || d.description.toLowerCase().includes(q.toLowerCase()))
    )
  }, [items, q, cat])

  return (
    <section className="min-h-screen bg-[#0b0c14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold">Open Data Hub</h2>
        <p className="text-white/70">Discover public datasets and mock APIs.</p>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search datasets" className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-2" />
          <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full md:w-56 bg-black/30 border border-white/10 rounded px-3 py-2">
            <option value="all">All categories</option>
            <option value="transport">Transport</option>
            <option value="air">Air</option>
            <option value="waste">Waste</option>
            <option value="energy">Energy</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col">
              <div className="text-xs text-white/60">Updated {d.last_updated}</div>
              <h3 className="text-xl font-semibold mt-1">{d.name}</h3>
              <p className="text-white/70 mt-1 flex-1">{d.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <a className="px-3 py-2 rounded bg-white/10 border border-white/10" href={d.download_csv}>CSV</a>
                <a className="px-3 py-2 rounded bg-white/10 border border-white/10" href={d.download_json}>JSON</a>
                <a className="px-3 py-2 rounded bg-[#00E0FF] text-black" href={d.api_endpoint}>API</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
