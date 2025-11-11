import { useMemo, useState } from 'react'

export default function Simulator(){
  const [ev, setEv] = useState(30)
  const [parks, setParks] = useState(25)
  const [waste, setWaste] = useState(40)
  const [solar, setSolar] = useState(35)

  const outputs = useMemo(() => {
    // Simple illustrative model
    const carbon = Math.max(0, 50000 - ev*120 - parks*90 - waste*60 - solar*140)
    const savings = Math.round(ev*50 + parks*30 + waste*25 + solar*60)
    const score = Math.min(100, Math.round(40 + ev*0.2 + parks*0.3 + waste*0.15 + solar*0.25))
    return { carbon, savings, score }
  }, [ev, parks, waste, solar])

  const reset = () => { setEv(30); setParks(25); setWaste(40); setSolar(35) }

  const saveScenario = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const payload = {
      name: `Scenario ${new Date().toLocaleString()}`,
      electric_vehicles_pct: ev,
      green_parks: parks,
      smart_waste_pct: waste,
      solar_adoption_pct: solar,
      carbon_reduction_kg: outputs.carbon,
      energy_savings_kwh: outputs.savings,
      livability_score: outputs.score
    }
    await fetch(`${baseUrl}/api/scenarios`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    alert('Scenario saved!')
  }

  return (
    <section className="min-h-screen bg-[#0b0c14] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold">Smart City Simulator</h2>
        <p className="text-white/70 mt-1">Adjust variables to see the impact in real-time.</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6">
            <Cityscape score={outputs.score} />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
            <Slider label="% Electric vehicles" value={ev} onChange={setEv} />
            <Slider label="Urban green parks" value={parks} onChange={setParks} max={100} />
            <Slider label="Smart waste coverage %" value={waste} onChange={setWaste} />
            <Slider label="Solar adoption %" value={solar} onChange={setSolar} />
            <div className="pt-2 grid grid-cols-3 gap-3 text-center">
              <Stat title="CO₂ Reduction" value={`${outputs.carbon.toLocaleString()} kg`} color="#00F5A8" />
              <Stat title="Energy Savings" value={`${outputs.savings.toLocaleString()} kWh`} color="#00E0FF" />
              <Stat title="Livability" value={`${outputs.score}`} color="#FFD166" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={reset} className="px-4 py-2 rounded-md bg-white/10 border border-white/10">Reset</button>
              <button onClick={saveScenario} className="px-4 py-2 rounded-md bg-[#00F5A8] text-black">Save Scenario</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, value, onChange, min=0, max=100 }){
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))} className="w-full accent-[#00F5A8]"/>
    </div>
  )
}

function Stat({ title, value, color }){
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-3">
      <div className="text-xs text-white/60">{title}</div>
      <div className="text-lg font-bold" style={{color}}>{value}</div>
    </div>
  )
}

function Cityscape({ score }){
  // Render a simple skyline that becomes greener with higher score
  const green = Math.min(100, Math.max(0, score))
  return (
    <svg className="w-full h-[320px]" viewBox="0 0 800 320">
      <rect width="800" height="320" fill="#0f1020" />
      <g>
        <rect x="40" y="140" width="90" height="160" fill="#1a1c2f" />
        <rect x="160" y="110" width="110" height="190" fill="#1a1c2f" />
        <rect x="300" y="160" width="80" height="140" fill="#1a1c2f" />
        <rect x="410" y="130" width="120" height="170" fill="#1a1c2f" />
        <rect x="560" y="170" width="90" height="130" fill="#1a1c2f" />
        <rect x="670" y="150" width="70" height="150" fill="#1a1c2f" />
      </g>
      <g>
        <rect x="0" y="300" width="800" height="20" fill="#0b0c14" />
        <rect x="0" y="290" width="800" height="10" fill="#00F5A8" opacity={green/140} />
      </g>
      <g>
        <circle cx="120" cy="220" r="6" fill="#00F5A8" opacity={0.4+green/200} />
        <circle cx="360" cy="200" r="6" fill="#00E0FF" opacity={0.4+green/200} />
        <circle cx="620" cy="210" r="6" fill="#FFD166" opacity={0.4+green/200} />
      </g>
    </svg>
  )
}
