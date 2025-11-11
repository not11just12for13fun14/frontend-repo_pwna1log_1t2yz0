import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Simulator from './components/Simulator'
import Ideas from './components/Ideas'
import DataHub from './components/DataHub'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0c14] text-white">
      <Navbar />
      <Hero />
      <Dashboard />
      <Simulator />
      <Ideas />
      <DataHub />
    </div>
  )
}

export default App
