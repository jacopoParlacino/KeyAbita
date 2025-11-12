import { useState, useEffect } from 'react';
import { 
  ValutazioneService, 
  ImmobileService,
  type Valutazione, 
  type Immobile,
  type CreateValutazioneRequest 
} from '../../services';

interface ValutazioneTestProps {
  onLog: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function ValutazioneTest({ onLog }: ValutazioneTestProps) {
  const [valuations, setValuations] = useState<Valutazione[]>([]);
  const [properties, setProperties] = useState<Immobile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedValuation, setSelectedValuation] = useState<Valutazione | null>(null);

  // Form data for creating new valuation
  const [newValuation, setNewValutation] = useState<CreateValutazioneRequest>({
    valore: 0,
    immobileId: 0
  });

  // Search fields
  const [searchId, setSearchId] = useState('');
  const [searchPropertyId, setSearchPropertyId] = useState('');
  const [rangeMin, setRangeMin] = useState('');
  const [rangeMax, setRangeMax] = useState('');

  const loadValuations = async () => {
    try {
      setLoading(true);
      onLog('Caricamento valutazioni...', 'info');
      const data = await ValutazioneService.getAll();
      setValuations(data);
      onLog(`Caricate ${data.length} valutazioni`, 'success');
    } catch (error) {
      onLog(`Errore caricamento valutazioni: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadProperties = async () => {
    try {
      const data = await ImmobileService.getAll();
      setProperties(data);
    } catch (error) {
      onLog(`Errore caricamento immobili: ${error}`, 'error');
    }
  };

  const createValuation = async () => {
    if (!newValuation.valore || !newValuation.immobileId) {
      onLog('Compilare tutti i campi obbligatori', 'error');
      return;
    }
    
    try {
      onLog('Creazione valutazione...', 'info');
      const created = await ValutazioneService.create(newValuation);
      onLog(`Valutazione creata: €${created.valore} (ID: ${created.id})`, 'success');
      setNewValutation({
        valore: 0,
        immobileId: 0
      });
      loadValuations();
    } catch (error) {
      onLog(`Errore creazione valutazione: ${error}`, 'error');
    }
  };

  const searchById = async () => {
    if (!searchId) {
      onLog('Inserire un ID valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca valutazione con ID: ${searchId}`, 'info');
      const valuation = await ValutazioneService.getById(parseInt(searchId));
      setSelectedValuation(valuation);
      onLog(`Trovata valutazione: €${valuation.valore}`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per ID: ${error}`, 'error');
    }
  };

  const searchByProperty = async () => {
    if (!searchPropertyId) {
      onLog('Inserire ID immobile', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca valutazioni per immobile ID: ${searchPropertyId}`, 'info');
      const propertyValuations = await ValutazioneService.getByImmobile(parseInt(searchPropertyId));
      setValuations(propertyValuations);
      onLog(`Trovate ${propertyValuations.length} valutazioni per l'immobile`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per immobile: ${error}`, 'error');
    }
  };

  const searchByRange = async () => {
    if (!rangeMin || !rangeMax) {
      onLog('Inserire range valido', 'error');
      return;
    }
    
    try {
      onLog(`Ricerca valutazioni nel range €${rangeMin} - €${rangeMax}`, 'info');
      const rangeValuations = await ValutazioneService.getByRange(parseInt(rangeMin), parseInt(rangeMax));
      setValuations(rangeValuations);
      onLog(`Trovate ${rangeValuations.length} valutazioni nel range specificato`, 'success');
    } catch (error) {
      onLog(`Errore ricerca per range: ${error}`, 'error');
    }
  };

  useEffect(() => {
    loadValuations();
    loadProperties();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  return (
    <div className="api-test-section">
      <h3>💰 Test API Valutazioni</h3>
      
      {/* GET ALL */}
      <div className="test-group">
        <h4>GET /api/valutazioni</h4>
        <button onClick={loadValuations} disabled={loading} className="btn-primary">
          {loading ? 'Caricamento...' : 'Carica tutte le valutazioni'}
        </button>
        <div className="results">
          {valuations.length > 0 && (
            <div className="valuations-grid">
              {valuations.map(valuation => (
                <div key={valuation.id} className="valuation-card">
                  <h5>ID: {valuation.id}</h5>
                  <p><strong>Valore:</strong> {formatCurrency(valuation.valore)}</p>
                  <p><strong>Data:</strong> {formatDate(valuation.dataValutazione)}</p>
                  <p><strong>Immobile:</strong> {valuation.immobile.via}</p>
                  <p><strong>Città:</strong> {valuation.immobile.citta.nome}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* POST */}
      <div className="test-group">
        <h4>POST /api/valutazioni</h4>
        <div className="form-grid">
          <input
            type="number"
            value={newValuation.valore || ''}
            onChange={(e) => setNewValutation({...newValuation, valore: parseInt(e.target.value) || 0})}
            placeholder="Valore in euro"
          />
          <select
            value={newValuation.immobileId || ''}
            onChange={(e) => setNewValutation({...newValuation, immobileId: parseInt(e.target.value) || 0})}
          >
            <option value="">Seleziona immobile</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.via} - {property.citta.nome}
              </option>
            ))}
          </select>
          <button onClick={createValuation} className="btn-success">
            Crea Valutazione
          </button>
        </div>
      </div>

      {/* GET BY ID */}
      <div className="test-group">
        <h4>GET /api/valutazioni/{"{id}"}</h4>
        <div className="input-group">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID valutazione"
          />
          <button onClick={searchById} className="btn-info">
            Cerca per ID
          </button>
        </div>
      </div>

      {/* GET BY PROPERTY */}
      <div className="test-group">
        <h4>GET /api/valutazioni/immobile/{"{id}"}</h4>
        <div className="input-group">
          <select
            value={searchPropertyId}
            onChange={(e) => setSearchPropertyId(e.target.value)}
          >
            <option value="">Seleziona immobile</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                ID: {property.id} - {property.via}
              </option>
            ))}
          </select>
          <button onClick={searchByProperty} className="btn-info">
            Cerca per Immobile
          </button>
        </div>
      </div>

      {/* GET BY RANGE */}
      <div className="test-group">
        <h4>GET /api/valutazioni/range?min=X&max=Y</h4>
        <div className="input-group">
          <input
            type="number"
            value={rangeMin}
            onChange={(e) => setRangeMin(e.target.value)}
            placeholder="Valore minimo"
          />
          <input
            type="number"
            value={rangeMax}
            onChange={(e) => setRangeMax(e.target.value)}
            placeholder="Valore massimo"
          />
          <button onClick={searchByRange} className="btn-info">
            Cerca per Range
          </button>
        </div>
      </div>

      {/* SELECTED VALUATION */}
      {selectedValuation && (
        <div className="selected-item">
          <h4>Valutazione Selezionata:</h4>
          <p><strong>ID:</strong> {selectedValuation.id}</p>
          <p><strong>Valore:</strong> {formatCurrency(selectedValuation.valore)}</p>
          <p><strong>Data:</strong> {formatDate(selectedValuation.dataValutazione)}</p>
          <p><strong>Immobile:</strong> {selectedValuation.immobile.via}</p>
          <p><strong>Città:</strong> {selectedValuation.immobile.citta.nome}</p>
          <p><strong>Metratura:</strong> {selectedValuation.immobile.metratura} mq</p>
        </div>
      )}
    </div>
  );
}