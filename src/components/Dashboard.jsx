import { useEffect, useState } from 'react'
import { Layers3, Clock } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [layers, setLayers] = useState([])
  const [data, setData] = useState(null)
  const [active, setActive] = useState({ transport: true, energy: true, waste: false, air: true })
  const [time, setTime] = useState('now')

  useEffect(() => {
    fetch(`${baseUrl}/api/dashboard/layers`).then(r => r.json()).then(setLayers)
    fetchData()
  }, [])

  const fetchData = async (t = 'now') => {
    const res = await fetch(`${baseUrl}/api/dashboard/data?time=${t}`)
    const json = await res.json()
    setData(json)
    setTime(t)
  }

  const labels = ['T-4h','T-3h','T-2h','T-1h','Now']
  const mkSeries = (vals, color) => ({
    labels,
    datasets: [
      {
        label: 'Trend',
        data: vals,
        borderColor: color,
        backgroundColor: color + '55',
      }
    ]
  })

  return (
    <section className="min-h-screen bg-[#0b0c14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Interactive City Map & Dashboard</h2>
          <div className="flex items-center gap-2 text-white/70"><Clock className="h-4 w-4"/> <span className="text-sm">Viewing: {time}</span></div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
              {/* Map placeholder with animated SVG grid */}
              <svg className="w-full h-[360px] md:h-[420px] bg-[#0f1020]" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2340" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <g>
                  <circle cx="25%" cy="40%" r="6" fill="#00F5A8" className="animate-pulse"/>
                  <circle cx="65%" cy="60%" r="6" fill="#00E0FF" className="animate-pulse"/>
                  <circle cx="45%" cy="30%" r="6" fill="#FFD166" className="animate-pulse"/>
                </g>
              </svg>
              <div className="absolute top-3 right-3 backdrop-blur bg-black/40 rounded-lg border border-white/10 p-2">
                <div className="text-xs text-white/60 mb-1">Layers</div>
                <div className="flex flex-wrap gap-2">
                  {['transport','energy','waste','air'].map(k => (
                    <button key={k} onClick={() => setActive(a => ({...a, [k]: !a[k]}))} className={`px-2 py-1 rounded text-xs border ${active[k] ? 'bg-[#00F5A8] text-black border-transparent' : 'bg-white/5 border-white/10 text-white/80'}`}>{k}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <KpiCard label="EV usage" value={`${data?.transport?.ev_usage_pct ?? 0}%`} color="#00F5A8"/>
            <KpiCard label="Renewable mix" value={`${data?.energy?.renewable_mix_pct ?? 0}%`} color="#00E0FF"/>
            <KpiCard label="AQI" value={`${data?.air?.aqi ?? 0}`} color="#FFD166"/>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm text-white/60 mb-2">Traffic Congestion</h3>
            <Line data={mkSeries([40,46,52,57, data?.transport?.traffic_congestion*100 || 55], '#FF6B6B')} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}, x:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}}}} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm text-white/60 mb-2">Grid Load (MW)</h3>
            <Line data={mkSeries([780,800,835,840, data?.energy?.grid_load_mw || 820], '#00E0FF')} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}, x:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}}}} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm text-white/60 mb-2">Recycling Rate</h3>
            <Line data={mkSeries([28,31,33,34, (data?.waste?.recycling_rate||0)*100], '#00F5A8')} options={{responsive:true, plugins:{legend:{display:false}}, scales:{y:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}, x:{ticks:{color:'#94a3b8'}, grid:{color:'#1f2340'}}}}} />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button onClick={() => fetchData('2025-01-01')} className="px-3 py-2 rounded-md bg-white/10 border border-white/10 text-white/80 hover:bg-white/15">Historical</button>
          <button onClick={() => fetchData('now')} className="px-3 py-2 rounded-md bg-[#00F5A8] text-black">Live Now</button>
        </div>
      </div>
    </section>
  )
}

function KpiCard({label, value, color}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-white/60">{label}</div>
      <div className="text-2xl font-bold" style={{color}}>{value}</div>
    </div>
  )
}
