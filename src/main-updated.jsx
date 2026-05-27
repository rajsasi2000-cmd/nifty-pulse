import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WeatherApp from './WeatherApp.jsx'

function AppSwitcher() {
  const [activeApp, setActiveApp] = useState('nifty')

  const switcherStyles = `
    .app-switcher-nav {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 20px;
      background: rgba(15, 23, 42, 0.8);
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
    }

    .nav-btn {
      padding: 10px 20px;
      border: 2px solid rgba(14, 165, 233, 0.3);
      border-radius: 8px;
      background: transparent;
      color: #e2e8f0;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-size: 0.95rem;
    }

    .nav-btn:hover {
      border-color: #0ea5e9;
      background: rgba(14, 165, 233, 0.1);
    }

    .nav-btn.active {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      border-color: #0284c7;
      color: white;
      box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
    }
  `

  return (
    <>
      <style>{switcherStyles}</style>
      <nav className="app-switcher-nav">
        <button 
          className={`nav-btn ${activeApp === 'nifty' ? 'active' : ''}`}
          onClick={() => setActiveApp('nifty')}
        >
          📈 Nifty Pulse
        </button>
        <button 
          className={`nav-btn ${activeApp === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveApp('weather')}
        >
          🌤️ Weather Dashboard
        </button>
      </nav>
      {activeApp === 'nifty' ? <App /> : <WeatherApp />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppSwitcher />
  </React.StrictMode>,
)
