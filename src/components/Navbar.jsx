import { Menu, Map, GaugeCircle, Sparkles, Database } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const link = (href, label) => (
    <a href={href} className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10">
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0c14]/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-[#00F5A8]" />
          <span className="font-semibold">CitySense</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {link('/', 'Home')}
          {link('/dashboard', 'Dashboard')}
          {link('/simulator', 'Simulator')}
          {link('/ideas', 'Ideas')}
          {link('/data', 'Data')}
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="flex flex-col rounded-lg border border-white/10 bg-white/5">
            {link('/', 'Home')}
            {link('/dashboard', 'Dashboard')}
            {link('/simulator', 'Simulator')}
            {link('/ideas', 'Ideas')}
            {link('/data', 'Data')}
          </div>
        </div>
      )}
    </header>
  )
}
