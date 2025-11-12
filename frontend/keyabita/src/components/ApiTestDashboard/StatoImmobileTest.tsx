import { useState, useEffect } from 'react';
import { StatoImmobileService, type StatoImmobile } from '../../services';

interface StatoImmobileTestProps {
  onLog: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function StatoImmobileTest({ onLog }: StatoImmobileTestProps) {
  const [states, setStates] = useState<StatoImmobile[]>([]);
  const [loading, setLoading] = useState(false);
  const [newStateName, setNewStateName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedState, setSelectedState] = useState<StatoImmobile | null>(null);

  const loadStates = async () => {
    try {
      setLoading(true);
      onLog('Caricamento stati immobile...', 'info');
      const data = await StatoImmobileService.getAll();
      setStates(data);
      onLog(`Caricati ${data.length} stati immobile`, 'success');
    } catch (error) {
      onLog(`Errore caricamento stati: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const createState = async () => {
    if (!newStateName.trim()) {
      onLog('Inserire il nome dello stato', 'error');
      return;
    }
    
    try {
      onLog(`Creazione stato: ${newStateName}`, 'info');
      const newState = await StatoImmobileService.create({ nome: newStateName });
      onLog(`Stato creato: ${newState.nome} (ID: ${newState.id})`, 'success');
      setNewStateName('');
      loadStates();
    } catch (error) {
      onLog(`Errore creazione stato: ${error}`, 'error');
    }
  };

  const searchById = async () => {
    if (!searchId) {
      onLog('Inserire un ID valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca stato con ID: ${searchId}`, 'info');
      const state = await StatoImmobileService.getById(parseInt(searchId));
      setSelectedState(state);
      onLog(`Trovato stato: ${state.nome}`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per ID: ${error}`, 'error');
    }
  };

  const searchByName = async () => {
    if (!searchName.trim()) {
      onLog('Inserire un nome valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca stato con nome: ${searchName}`, 'info');
      const state = await StatoImmobileService.getByNome(searchName);
      setSelectedState(state);
      onLog(`Trovato stato: ${state.nome} (ID: ${state.id})`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per nome: ${error}`, 'error');
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  return (
    <div className="api-test-section">
      <h3>🏠 Test API Stati Immobile</h3>
      
      {/* GET ALL */}
      <div className="test-group">
        <h4>GET /api/stati-immobile</h4>
        <button onClick={loadStates} disabled={loading} className="btn-primary">
          {loading ? 'Caricamento...' : 'Carica tutti gli stati'}
        </button>
        <div className="results">
          {states.length > 0 && (
            <ul>
              {states.map(state => (
                <li key={state.id}>ID: {state.id} - {state.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* POST */}
      <div className="test-group">
        <h4>POST /api/stati-immobile</h4>
        <div className="input-group">
          <input
            type="text"
            value={newStateName}
            onChange={(e) => setNewStateName(e.target.value)}
            placeholder="Nome stato (es. Eccellente, Buono, Da ristrutturare)"
          />
          <button onClick={createState} className="btn-success">
            Crea Stato
          </button>
        </div>
      </div>

      {/* GET BY ID */}
      <div className="test-group">
        <h4>GET /api/stati-immobile/{"{id}"}</h4>
        <div className="input-group">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID stato"
          />
          <button onClick={searchById} className="btn-info">
            Cerca per ID
          </button>
        </div>
      </div>

      {/* GET BY NAME */}
      <div className="test-group">
        <h4>GET /api/stati-immobile/nome/{"{nome}"}</h4>
        <div className="input-group">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Nome stato"
          />
          <button onClick={searchByName} className="btn-info">
            Cerca per Nome
          </button>
        </div>
      </div>

      {/* SELECTED STATE */}
      {selectedState && (
        <div className="selected-item">
          <h4>Stato Selezionato:</h4>
          <p><strong>ID:</strong> {selectedState.id}</p>
          <p><strong>Nome:</strong> {selectedState.nome}</p>
        </div>
      )}
    </div>
  );
}