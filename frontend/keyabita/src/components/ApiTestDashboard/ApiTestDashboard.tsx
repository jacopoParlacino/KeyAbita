import { useState } from 'react';
import CittaTest from './CittaTest';
import StatoImmobileTest from './StatoImmobileTest';
import ImmobileTest from './ImmobileTest';
import ValutazioneTest from './ValutazioneTest';
import DataSeeder from './DataSeeder';
import './ApiTestDashboard.scss';

type LogMessage = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
};

export default function ApiTestDashboard() {
  const [activeTab, setActiveTab] = useState('seeder');
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const addLog = (message: string, type: 'success' | 'error' | 'info') => {
    const newLog: LogMessage = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only last 100 logs
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT');
  };

  return (
    <div className="api-test-dashboard">
      <header className="dashboard-header">
        <h1>🧪 Dashboard Test API KeyAbita</h1>
        <p>Testa tutte le API REST del backend Spring Boot</p>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'seeder' ? 'active' : ''}`}
          onClick={() => setActiveTab('seeder')}
        >
          🌱 Data Seeder
        </button>
        <button
          className={`tab-button ${activeTab === 'citta' ? 'active' : ''}`}
          onClick={() => setActiveTab('citta')}
        >
          🏙️ Città
        </button>
        <button
          className={`tab-button ${activeTab === 'stati' ? 'active' : ''}`}
          onClick={() => setActiveTab('stati')}
        >
          🏠 Stati Immobile
        </button>
        <button
          className={`tab-button ${activeTab === 'immobili' ? 'active' : ''}`}
          onClick={() => setActiveTab('immobili')}
        >
          🏢 Immobili
        </button>
        <button
          className={`tab-button ${activeTab === 'valutazioni' ? 'active' : ''}`}
          onClick={() => setActiveTab('valutazioni')}
        >
          💰 Valutazioni
        </button>
      </nav>

      <div className="dashboard-content">
        <main className="test-content">
          {activeTab === 'seeder' && <DataSeeder onLog={addLog} />}
          {activeTab === 'citta' && <CittaTest onLog={addLog} />}
          {activeTab === 'stati' && <StatoImmobileTest onLog={addLog} />}
          {activeTab === 'immobili' && <ImmobileTest onLog={addLog} />}
          {activeTab === 'valutazioni' && <ValutazioneTest onLog={addLog} />}
        </main>

        <aside className="logs-sidebar">
          <div className="logs-header">
            <h3>📋 Log Operazioni</h3>
            <button onClick={clearLogs} className="btn-clear">
              Pulisci
            </button>
          </div>
          <div className="logs-content">
            {logs.length === 0 ? (
              <p className="no-logs">Nessuna operazione eseguita</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className={`log-entry log-${log.type}`}>
                  <span className="log-time">{formatTime(log.timestamp)}</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <footer className="dashboard-footer">
        <div className="server-status">
          <div className="status-item">
            <span className="status-dot backend"></span>
            <span>Backend: http://localhost:8080</span>
          </div>
          <div className="status-item">
            <span className="status-dot frontend"></span>
            <span>Frontend: http://localhost:5173</span>
          </div>
        </div>
        <div className="quick-links">
          <a href="http://localhost:8080/h2-console" target="_blank" rel="noopener noreferrer">
            🗄️ H2 Console
          </a>
          <a href="http://localhost:5173/valutazione" target="_blank" rel="noopener noreferrer">
            📝 Form Valutazione
          </a>
        </div>
      </footer>
    </div>
  );
}