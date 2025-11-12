import { useState, useEffect } from 'react';
import { CittaService, StatoImmobileService, type Citta, type StatoImmobile } from '../services';

export default function ApiTest() {
  const [cities, setCities] = useState<Citta[]>([]);
  const [states, setStates] = useState<StatoImmobile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [citiesData, statesData] = await Promise.all([
          CittaService.getAll(),
          StatoImmobileService.getAll()
        ]);
        
        setCities(citiesData);
        setStates(statesData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Errore nel caricamento dei dati dal backend');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Caricamento dati dal backend...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <h3>Errore di connessione</h3>
        <p>{error}</p>
        <p>Assicurati che il backend sia in esecuzione su http://localhost:8080</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Connessione Backend</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Città disponibili ({cities.length}):</h3>
        <ul>
          {cities.map(city => (
            <li key={city.id}>{city.nome}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Stati Immobile disponibili ({states.length}):</h3>
        <ul>
          {states.map(state => (
            <li key={state.id}>{state.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}