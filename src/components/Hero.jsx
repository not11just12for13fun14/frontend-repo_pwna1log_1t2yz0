import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-[#0b0c14]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <p className="text-sm md:text-base text-cyan-200/80 tracking-widest uppercase">CitySense</p>
        <h1 className="mt-3 text-3xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
          Where Data Meets Democracy in the City of Tomorrow.
        </h1>
        <p className="mt-4 text-cyan-100/90 max-w-2xl">
          Explore real-time urban analytics, run sustainability simulations, and collaborate with citizens to build smarter, greener cities.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/dashboard" className="px-5 py-3 rounded-lg bg-[#00F5A8] text-[#0b0c14] font-semibold shadow-lg hover:shadow-[#00F5A8]/40 transition-shadow">Explore City Data</a>
          <a href="/simulator" className="px-5 py-3 rounded-lg bg-[#00E0FF] text-[#0b0c14] font-semibold shadow-lg hover:shadow-[#00E0FF]/40 transition-shadow">Run Sustainability Simulations</a>
          <a href="/ideas" className="px-5 py-3 rounded-lg border border-white/20 text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition">
            Join the Citizen Portal
          </a>
        </div>
      </div>
    </section>
  )
}
