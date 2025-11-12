import { useState } from 'react';
import { 
  CittaService, 
  StatoImmobileService, 
  ImmobileService,
  ValutazioneService 
} from '../../services';

interface DataSeederProps {
  onLog: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function DataSeeder({ onLog }: DataSeederProps) {
  const [seeding, setSeeding] = useState(false);

  const sampleCities = [
    'Roma', 'Napoli', 'Firenze', 'Bologna', 'Venezia', 'Genova', 
    'Palermo', 'Bari', 'Catania', 'Verona', 'Padova', 'Trieste'
  ];

  const sampleStates = [
    'Ottimo', 'Buono', 'Discreto', 'Da ristrutturare', 'Pessimo',
    'Ristrutturato', 'Nuovo', 'Lusso', 'Abitabile', 'Da rinnovare'
  ];

  const sampleAddresses = [
    'Via Garibaldi', 'Via Roma', 'Corso Italia', 'Via Dante',
    'Piazza Venezia', 'Via Mazzini', 'Via Verdi', 'Corso Europa',
    'Via Nazionale', 'Piazza Duomo', 'Via Cavour', 'Viale della Libertà'
  ];

  const generateRandomData = () => {
    const randomCity = sampleCities[Math.floor(Math.random() * sampleCities.length)];
    const randomState = sampleStates[Math.floor(Math.random() * sampleStates.length)];
    const randomAddress = `${sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]} ${Math.floor(Math.random() * 100) + 1}`;
    const randomMq = Math.floor(Math.random() * 200) + 50;
    const randomRooms = Math.floor(Math.random() * 5) + 1;
    const randomFloor = Math.floor(Math.random() * 10);
    const randomYear = Math.floor(Math.random() * 30) + 1990;
    const randomValue = Math.floor(Math.random() * 400000) + 100000;

    return {
      city: randomCity,
      state: randomState,
      address: randomAddress,
      mq: randomMq,
      rooms: randomRooms,
      floor: randomFloor,
      year: randomYear,
      value: randomValue
    };
  };

  const seedCities = async () => {
    try {
      onLog('Seeding città...', 'info');
      let created = 0;
      
      for (const cityName of sampleCities) {
        try {
          await CittaService.create({ nome: cityName });
          created++;
        } catch (error) {
          // City might already exist, continue
          console.log(`City ${cityName} might already exist`);
        }
      }
      
      onLog(`Create ${created} nuove città`, 'success');
    } catch (error) {
      onLog(`Errore seeding città: ${error}`, 'error');
    }
  };

  const seedStates = async () => {
    try {
      onLog('Seeding stati immobile...', 'info');
      let created = 0;
      
      for (const stateName of sampleStates) {
        try {
          await StatoImmobileService.create({ nome: stateName });
          created++;
        } catch (error) {
          // State might already exist, continue
          console.log(`State ${stateName} might already exist`);
        }
      }
      
      onLog(`Creati ${created} nuovi stati immobile`, 'success');
    } catch (error) {
      onLog(`Errore seeding stati: ${error}`, 'error');
    }
  };

  const seedProperties = async (count: number = 10) => {
    try {
      onLog(`Seeding ${count} immobili...`, 'info');
      
      // Get existing cities and states
      const [cities, states] = await Promise.all([
        CittaService.getAll(),
        StatoImmobileService.getAll()
      ]);

      if (cities.length === 0 || states.length === 0) {
        onLog('Nessuna città o stato disponibile. Eseguire prima il seeding delle città e stati.', 'error');
        return;
      }

      let created = 0;
      for (let i = 0; i < count; i++) {
        const data = generateRandomData();
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomState = states[Math.floor(Math.random() * states.length)];
        
        try {
          await ImmobileService.create({
            via: data.address,
            metratura: data.mq,
            numeroStanze: data.rooms,
            piano: data.floor,
            annoCostruzione: data.year,
            cittaId: randomCity.id,
            statoImmobileId: randomState.id
          });
          created++;
        } catch (error) {
          console.log(`Error creating property ${i}:`, error);
        }
      }
      
      onLog(`Creati ${created} nuovi immobili`, 'success');
    } catch (error) {
      onLog(`Errore seeding immobili: ${error}`, 'error');
    }
  };

  const seedValuations = async (count: number = 15) => {
    try {
      onLog(`Seeding ${count} valutazioni...`, 'info');
      
      // Get existing properties
      const properties = await ImmobileService.getAll();

      if (properties.length === 0) {
        onLog('Nessun immobile disponibile. Eseguire prima il seeding degli immobili.', 'error');
        return;
      }

      let created = 0;
      for (let i = 0; i < count; i++) {
        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        const randomValue = Math.floor(Math.random() * 500000) + 50000;
        
        try {
          await ValutazioneService.create({
            valore: randomValue,
            immobileId: randomProperty.id
          });
          created++;
        } catch (error) {
          console.log(`Error creating valuation ${i}:`, error);
        }
      }
      
      onLog(`Create ${created} nuove valutazioni`, 'success');
    } catch (error) {
      onLog(`Errore seeding valutazioni: ${error}`, 'error');
    }
  };

  const seedAllData = async () => {
    setSeeding(true);
    onLog('🌱 Iniziando seeding completo...', 'info');
    
    try {
      await seedCities();
      await seedStates();
      await seedProperties(20);
      await seedValuations(30);
      
      onLog('🎉 Seeding completo terminato con successo!', 'success');
    } catch (error) {
      onLog(`Errore durante seeding completo: ${error}`, 'error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="api-test-section">
      <h3>🌱 Data Seeder</h3>
      <p>Popola il database con dati di test per facilitare i test delle API</p>
      
      <div className="test-group">
        <h4>Seeding Individuale</h4>
        <div className="seeder-buttons">
          <button 
            onClick={seedCities} 
            disabled={seeding}
            className="btn-info"
          >
            🏙️ Seed Città ({sampleCities.length})
          </button>
          
          <button 
            onClick={seedStates} 
            disabled={seeding}
            className="btn-info"
          >
            🏠 Seed Stati ({sampleStates.length})
          </button>
          
          <button 
            onClick={() => seedProperties(10)} 
            disabled={seeding}
            className="btn-info"
          >
            🏢 Seed Immobili (10)
          </button>
          
          <button 
            onClick={() => seedValuations(15)} 
            disabled={seeding}
            className="btn-info"
          >
            💰 Seed Valutazioni (15)
          </button>
        </div>
      </div>

      <div className="test-group">
        <h4>Seeding Completo</h4>
        <button 
          onClick={seedAllData} 
          disabled={seeding}
          className="btn-success"
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
        >
          {seeding ? '🌱 Seeding in corso...' : '🚀 Seed Tutti i Dati'}
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Questo creerà: {sampleCities.length} città, {sampleStates.length} stati, 20 immobili e 30 valutazioni
        </p>
      </div>

      <div className="test-group">
        <h4>📊 Statistiche Dati Campione</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <strong>Città:</strong> {sampleCities.join(', ')}
          </div>
          <div className="stat-item">
            <strong>Stati Immobile:</strong> {sampleStates.join(', ')}
          </div>
          <div className="stat-item">
            <strong>Range Metratura:</strong> 50-250 mq
          </div>
          <div className="stat-item">
            <strong>Range Stanze:</strong> 1-5
          </div>
          <div className="stat-item">
            <strong>Range Anni:</strong> 1990-2020
          </div>
          <div className="stat-item">
            <strong>Range Valutazioni:</strong> €50.000 - €550.000
          </div>
        </div>
      </div>
    </div>
  );
}

