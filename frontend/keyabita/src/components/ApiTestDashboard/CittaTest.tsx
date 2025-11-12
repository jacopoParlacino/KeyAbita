import { useState, useEffect } from 'react';
import { CittaService, type Citta } from '../../services';
import './ApiTestDashboard.scss';

interface CittaTestProps {
  onLog: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function CittaTest({ onLog }: CittaTestProps) {
  const [cities, setCities] = useState<Citta[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedCity, setSelectedCity] = useState<Citta | null>(null);

  const loadCities = async () => {
    try {
      setLoading(true);
      onLog('Caricamento città...', 'info');
      const data = await CittaService.getAll();
      setCities(data);
      onLog(`Caricate ${data.length} città`, 'success');
    } catch (error) {
      onLog(`Errore caricamento città: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const createCity = async () => {
    if (!newCityName.trim()) {
      onLog('Inserire il nome della città', 'error');
      return;
    }
    
    try {
      onLog(`Creazione città: ${newCityName}`, 'info');
      const newCity = await CittaService.create({ nome: newCityName });
      onLog(`Città creata: ${newCity.nome} (ID: ${newCity.id})`, 'success');
      setNewCityName('');
      loadCities();
    } catch (error) {
      onLog(`Errore creazione città: ${error}`, 'error');
    }
  };

  const searchById = async () => {
    if (!searchId) {
      onLog('Inserire un ID valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca città con ID: ${searchId}`, 'info');
      const city = await CittaService.getById(parseInt(searchId));
      setSelectedCity(city);
      onLog(`Trovata città: ${city.nome}`, 'success');
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
      onLog(`Ricerca città con nome: ${searchName}`, 'info');
      const city = await CittaService.getByNome(searchName);
      setSelectedCity(city);
      onLog(`Trovata città: ${city.nome} (ID: ${city.id})`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per nome: ${error}`, 'error');
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  return (
    <div className="api-test-section">
      <h3>🏙️ Test API Città</h3>
      
      {/* GET ALL */}
      <div className="test-group">
        <h4>GET /api/citta</h4>
        <button onClick={loadCities} disabled={loading} className="btn-primary">
          {loading ? 'Caricamento...' : 'Carica tutte le città'}
        </button>
        <div className="results">
          {cities.length > 0 && (
            <ul>
              {cities.map(city => (
                <li key={city.id}>ID: {city.id} - {city.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* POST */}
      <div className="test-group">
        <h4>POST /api/citta</h4>
        <div className="input-group">
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Nome città"
          />
          <button onClick={createCity} className="btn-success">
            Crea Città
          </button>
        </div>
      </div>

      {/* GET BY ID */}
      <div className="test-group">
        <h4>GET /api/citta/{"{id}"}</h4>
        <div className="input-group">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID città"
          />
          <button onClick={searchById} className="btn-info">
            Cerca per ID
          </button>
        </div>
      </div>

      {/* GET BY NAME */}
      <div className="test-group">
        <h4>GET /api/citta/nome/{"{nome}"}</h4>
        <div className="input-group">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Nome città"
          />
          <button onClick={searchByName} className="btn-info">
            Cerca per Nome
          </button>
        </div>
      </div>

      {/* SELECTED CITY */}
      {selectedCity && (
        <div className="selected-item">
          <h4>Città Selezionata:</h4>
          <p><strong>ID:</strong> {selectedCity.id}</p>
          <p><strong>Nome:</strong> {selectedCity.nome}</p>
        </div>
      )}
    </div>
  );
}