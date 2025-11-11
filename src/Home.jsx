import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function Home(){
  return (
    <div className="min-h-screen bg-[#0b0c14] text-white">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
