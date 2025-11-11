import { Twitter, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0b0c14]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
        <div>
          <h3 className="font-semibold text-white">About CitySense</h3>
          <p className="mt-2 text-sm text-white/60">Smart & Sustainable City dashboard blending real-time data with civic engagement.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Open Data Policy</h3>
          <p className="mt-2 text-sm text-white/60">All mock datasets provided for demonstration purposes. APIs mirror typical city data portals.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-3 flex gap-3">
            <a href="#" className="p-2 rounded bg-white/5 hover:bg-white/10"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="p-2 rounded bg-white/5 hover:bg-white/10"><Github className="h-4 w-4" /></a>
            <a href="#" className="p-2 rounded bg-white/5 hover:bg-white/10"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/50 text-sm">© {new Date().getFullYear()} CitySense</div>
    </footer>
  )
}
