import { useState, useEffect } from 'react';
import { 
  ImmobileService, 
  CittaService, 
  StatoImmobileService,
  type Immobile, 
  type Citta, 
  type StatoImmobile,
  type CreateImmobileRequest 
} from '../../services';

interface ImmobileTestProps {
  onLog: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function ImmobileTest({ onLog }: ImmobileTestProps) {
  const [properties, setProperties] = useState<Immobile[]>([]);
  const [cities, setCities] = useState<Citta[]>([]);
  const [states, setStates] = useState<StatoImmobile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Immobile | null>(null);

  // Form data for creating new property
  const [newProperty, setNewProperty] = useState<CreateImmobileRequest>({
    via: '',
    metratura: 0,
    numeroStanze: 0,
    piano: 0,
    annoCostruzione: 2024,
    cittaId: 0,
    statoImmobileId: 0
  });

  // Search fields
  const [searchId, setSearchId] = useState('');
  const [searchCityName, setSearchCityName] = useState('');
  const [searchStateName, setSearchStateName] = useState('');
  const [searchRooms, setSearchRooms] = useState('');

  const loadProperties = async () => {
    try {
      setLoading(true);
      onLog('Caricamento immobili...', 'info');
      const data = await ImmobileService.getAll();
      setProperties(data);
      onLog(`Caricati ${data.length} immobili`, 'success');
    } catch (error) {
      onLog(`Errore caricamento immobili: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadFormData = async () => {
    try {
      const [citiesData, statesData] = await Promise.all([
        CittaService.getAll(),
        StatoImmobileService.getAll()
      ]);
      setCities(citiesData);
      setStates(statesData);
    } catch (error) {
      onLog(`Errore caricamento dati form: ${error}`, 'error');
    }
  };

  const createProperty = async () => {
    if (!newProperty.via || !newProperty.cittaId || !newProperty.statoImmobileId) {
      onLog('Compilare tutti i campi obbligatori', 'error');
      return;
    }
    
    try {
      onLog('Creazione immobile...', 'info');
      const created = await ImmobileService.create(newProperty);
      onLog(`Immobile creato: ${created.via} (ID: ${created.id})`, 'success');
      setNewProperty({
        via: '',
        metratura: 0,
        numeroStanze: 0,
        piano: 0,
        annoCostruzione: 2024,
        cittaId: 0,
        statoImmobileId: 0
      });
      loadProperties();
    } catch (error) {
      onLog(`Errore creazione immobile: ${error}`, 'error');
    }
  };

  const searchById = async () => {
    if (!searchId) {
      onLog('Inserire un ID valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca immobile con ID: ${searchId}`, 'info');
      const property = await ImmobileService.getById(parseInt(searchId));
      setSelectedProperty(property);
      onLog(`Trovato immobile: ${property.via}`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per ID: ${error}`, 'error');
    }
  };

  const searchByCity = async () => {
    if (!searchCityName.trim()) {
      onLog('Inserire nome città', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca immobili nella città: ${searchCityName}`, 'info');
      const propertiesInCity = await ImmobileService.getByCitta(searchCityName);
      setProperties(propertiesInCity);
      onLog(`Trovati ${propertiesInCity.length} immobili nella città ${searchCityName}`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per città: ${error}`, 'error');
    }
  };

  const searchByState = async () => {
    if (!searchStateName.trim()) {
      onLog('Inserire nome stato', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca immobili con stato: ${searchStateName}`, 'info');
      const propertiesWithState = await ImmobileService.getByStatoImmobile(searchStateName);
      setProperties(propertiesWithState);
      onLog(`Trovati ${propertiesWithState.length} immobili con stato ${searchStateName}`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per stato: ${error}`, 'error');
    }
  };

  const searchByRooms = async () => {
    if (!searchRooms) {
      onLog('Inserire numero stanze', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca immobili con ${searchRooms} stanze`, 'info');
      const propertiesWithRooms = await ImmobileService.getByNumeroStanze(parseInt(searchRooms));
      setProperties(propertiesWithRooms);
      onLog(`Trovati ${propertiesWithRooms.length} immobili con ${searchRooms} stanze`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per stanze: ${error}`, 'error');
    }
  };

  useEffect(() => {
    loadProperties();
    loadFormData();
  }, []);

  return (
    <div className="api-test-section">
      <h3>🏢 Test API Immobili</h3>
      
      {/* GET ALL */}
      <div className="test-group">
        <h4>GET /api/immobili</h4>
        <button onClick={loadProperties} disabled={loading} className="btn-primary">
          {loading ? 'Caricamento...' : 'Carica tutti gli immobili'}
        </button>
        <div className="results">
          {properties.length > 0 && (
            <div className="properties-grid">
              {properties.map(property => (
                <div key={property.id} className="property-card">
                  <h5>ID: {property.id}</h5>
                  <p><strong>Via:</strong> {property.via}</p>
                  <p><strong>Città:</strong> {property.citta.nome}</p>
                  <p><strong>Metratura:</strong> {property.metratura} mq</p>
                  <p><strong>Stanze:</strong> {property.numeroStanze}</p>
                  <p><strong>Piano:</strong> {property.piano}</p>
                  <p><strong>Anno:</strong> {property.annoCostruzione}</p>
                  <p><strong>Stato:</strong> {property.statoImmobile.nome}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* POST */}
      <div className="test-group">
        <h4>POST /api/immobili</h4>
        <div className="form-grid">
          <input
            type="text"
            value={newProperty.via}
            onChange={(e) => setNewProperty({...newProperty, via: e.target.value})}
            placeholder="Via e numero"
          />
          <input
            type="number"
            value={newProperty.metratura || ''}
            onChange={(e) => setNewProperty({...newProperty, metratura: parseInt(e.target.value) || 0})}
            placeholder="Metratura"
          />
          <input
            type="number"
            value={newProperty.numeroStanze || ''}
            onChange={(e) => setNewProperty({...newProperty, numeroStanze: parseInt(e.target.value) || 0})}
            placeholder="Numero stanze"
          />
          <input
            type="number"
            value={newProperty.piano || ''}
            onChange={(e) => setNewProperty({...newProperty, piano: parseInt(e.target.value) || 0})}
            placeholder="Piano"
          />
          <input
            type="number"
            value={newProperty.annoCostruzione || ''}
            onChange={(e) => setNewProperty({...newProperty, annoCostruzione: parseInt(e.target.value) || 0})}
            placeholder="Anno costruzione"
          />
          <select
            value={newProperty.cittaId || ''}
            onChange={(e) => setNewProperty({...newProperty, cittaId: parseInt(e.target.value) || 0})}
          >
            <option value="">Seleziona città</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.nome}</option>
            ))}
          </select>
          <select
            value={newProperty.statoImmobileId || ''}
            onChange={(e) => setNewProperty({...newProperty, statoImmobileId: parseInt(e.target.value) || 0})}
          >
            <option value="">Seleziona stato</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.nome}</option>
            ))}
          </select>
          <button onClick={createProperty} className="btn-success">
            Crea Immobile
          </button>
        </div>
      </div>

      {/* GET BY ID */}
      <div className="test-group">
        <h4>GET /api/immobili/{"{id}"}</h4>
        <div className="input-group">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID immobile"
          />
          <button onClick={searchById} className="btn-info">
            Cerca per ID
          </button>
        </div>
      </div>

      {/* GET BY CITY */}
      <div className="test-group">
        <h4>GET /api/immobili/citta/{"{nome}"}</h4>
        <div className="input-group">
          <input
            type="text"
            value={searchCityName}
            onChange={(e) => setSearchCityName(e.target.value)}
            placeholder="Nome città"
          />
          <button onClick={searchByCity} className="btn-info">
            Cerca per Città
          </button>
        </div>
      </div>

      {/* GET BY STATE */}
      <div className="test-group">
        <h4>GET /api/immobili/stato-immobile/{"{nome}"}</h4>
        <div className="input-group">
          <input
            type="text"
            value={searchStateName}
            onChange={(e) => setSearchStateName(e.target.value)}
            placeholder="Nome stato"
          />
          <button onClick={searchByState} className="btn-info">
            Cerca per Stato
          </button>
        </div>
      </div>

      {/* GET BY ROOMS */}
      <div className="test-group">
        <h4>GET /api/immobili/stanze/{"{n}"}</h4>
        <div className="input-group">
          <input
            type="number"
            value={searchRooms}
            onChange={(e) => setSearchRooms(e.target.value)}
            placeholder="Numero stanze"
          />
          <button onClick={searchByRooms} className="btn-info">
            Cerca per Stanze
          </button>
        </div>
      </div>

      {/* SELECTED PROPERTY */}
      {selectedProperty && (
        <div className="selected-item">
          <h4>Immobile Selezionato:</h4>
          <p><strong>ID:</strong> {selectedProperty.id}</p>
          <p><strong>Via:</strong> {selectedProperty.via}</p>
          <p><strong>Città:</strong> {selectedProperty.citta.nome}</p>
          <p><strong>Metratura:</strong> {selectedProperty.metratura} mq</p>
          <p><strong>Stanze:</strong> {selectedProperty.numeroStanze}</p>
          <p><strong>Piano:</strong> {selectedProperty.piano}</p>
          <p><strong>Anno:</strong> {selectedProperty.annoCostruzione}</p>
          <p><strong>Stato:</strong> {selectedProperty.statoImmobile.nome}</p>
        </div>
      )}
    </div>
  );
}