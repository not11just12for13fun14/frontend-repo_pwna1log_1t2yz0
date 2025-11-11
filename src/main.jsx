import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import App from './App'
import Test from './Test'
import './index.css'

function DashboardPage(){
  return <App />
}

function SimulatorPage(){
  const Comp = React.lazy(() => import('./components/Simulator'))
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <Comp />
    </React.Suspense>
  )
}

function IdeasPage(){
  const Comp = React.lazy(() => import('./components/Ideas'))
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <Comp />
    </React.Suspense>
  )
}

function DataHubPage(){
  const Comp = React.lazy(() => import('./components/DataHub'))
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <Comp />
    </React.Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/data" element={<DataHubPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
