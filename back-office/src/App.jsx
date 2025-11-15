import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import RecentEvaluations from './components/RecentEvaluations'
import QuickAccess from './components/QuickAccess'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header user={user} onLogout={handleLogout} />

        <div className="dashboard-content">
          <div className="stats-grid">
            <StatsCard
              title="Valutazioni Totali"
              value="156"
              icon="📝"
              trend="up"
              trendValue="+12%"
              color="blue"
            />
            <StatsCard
              title="Immobili Valutati"
              value="89"
              icon="🏠"
              trend="up"
              trendValue="+8%"
              color="green"
            />
            <StatsCard
              title="Clienti Attivi"
              value="43"
              icon="👥"
              trend="down"
              trendValue="-3%"
              color="orange"
            />
            <StatsCard
              title="Valore Medio"
              value="€ 285K"
              icon="💰"
              trend="up"
              trendValue="+5%"
              color="purple"
            />
          </div>

          <div className="content-grid">
            <RecentEvaluations />
            <QuickAccess />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
