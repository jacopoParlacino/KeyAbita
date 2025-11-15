import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import RecentEvaluations from './components/RecentEvaluations'
import QuickAccess from './components/QuickAccess'
import ContractsView from './components/ContractsView'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  const renderContent = () => {
    switch(currentView) {
      case 'contracts':
        return <ContractsView />
      default:
        return (
          <>
            <Header />
            <div className="dashboard-content">
              <div className="stats-grid">
                <StatsCard
                  title="Prezzo medio"
                  value="€327k"
                  icon="$"
                  color="green"
                />
                <StatsCard
                  title="Immobili Totale"
                  value="1.278"
                  icon="building"
                  color="blue"
                />
                <StatsCard
                  title="Da completare"
                  value="21"
                  icon="clock"
                  color="orange"
                />
                <StatsCard
                  title="Valutazioni"
                  value="79"
                  icon="chart"
                  color="purple"
                />
              </div>

              <div className="content-grid">
                <RecentEvaluations />
                <QuickAccess onNavigateToContracts={() => setCurrentView('contracts')} />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="app">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
