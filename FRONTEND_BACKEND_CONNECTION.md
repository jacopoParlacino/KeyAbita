# KeyAbita - Frontend/Backend Connection Guide

Il frontend React è ora collegato al backend Spring Boot! 🎉

## ✅ Cosa è stato implementato

### 1. **Configurazione Environment**
- File `.env.development` con `VITE_API_BASE_URL=http://localhost:8080/api`
- Client HTTP centralizzato con axios in `src/lib/apiClient.ts`

### 2. **Servizi API** 
Creati servizi TypeScript per ogni endpoint del backend:
- `src/services/cittaService.ts` - Gestione città
- `src/services/statoImmobileService.ts` - Gestione stati immobile
- `src/services/immobileService.ts` - Gestione immobili
- `src/services/valutazioneService.ts` - Gestione valutazioni

### 3. **MultiStepForm Aggiornato**
Il form di valutazione ora:
- Carica città e stati immobile dal backend
- Invia dati strutturati alle API REST
- Gestisce loading states e errori
- Crea immobile + valutazione in sequenza

### 4. **Componente di Test API**
- Nuovo componente `ApiTest.tsx` per verificare la connessione
- Accessibile su `/test-api` per debug

## 🚀 Come avviare tutto

### 1. Avviare il Backend
```bash
cd keyabita
.\mvnw.cmd spring-boot:run
```
Il backend sarà disponibile su http://localhost:8080

### 2. Avviare il Frontend  
```bash
cd frontend/keyabita
npm run dev
```
Il frontend sarà disponibile su http://localhost:5173

### 3. Testare la Connessione
- Vai su http://localhost:5173/test-api per verificare che i dati vengano caricati dal backend
- Vai su http://localhost:5173/valutazione per testare il form completo

## 🎯 Endpoint Backend Disponibili

### Città
- `GET /api/citta` - Tutte le città
- `GET /api/citta/{id}` - Città per ID
- `POST /api/citta` - Crea nuova città

### Stati Immobile
- `GET /api/stati-immobile` - Tutti gli stati
- `GET /api/stati-immobile/{id}` - Stato per ID  
- `POST /api/stati-immobile` - Crea nuovo stato

### Immobili
- `GET /api/immobili` - Tutti gli immobili
- `GET /api/immobili/{id}` - Immobile per ID
- `POST /api/immobili` - Crea nuovo immobile
- `GET /api/immobili/citta/{nome}` - Immobili per città
- `GET /api/immobili/stanze/{n}` - Immobili per numero stanze

### Valutazioni
- `GET /api/valutazioni` - Tutte le valutazioni
- `GET /api/valutazioni/{id}` - Valutazione per ID
- `POST /api/valutazioni` - Crea nuova valutazione
- `GET /api/valutazioni/immobile/{id}` - Valutazioni per immobile

## 💡 Esempi d'Uso

### Usare i Servizi nei Componenti
```tsx
import { CittaService, ImmobileService } from '../services';

// Caricare tutte le città
const cities = await CittaService.getAll();

// Creare un nuovo immobile
const newProperty = await ImmobileService.create({
  via: "Via Roma 10",
  metratura: 120,
  numeroStanze: 3,
  piano: 2,
  annoCostruzione: 2010,
  cittaId: 1,
  statoImmobileId: 2
});
```

### Gestire Stati Loading ed Errori
```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

try {
  setLoading(true);
  const data = await CittaService.getAll();
  // usa i dati...
} catch (err) {
  setError('Errore nel caricamento');
} finally {
  setLoading(false);
}
```

## 🔧 Configurazione CORS
Il backend è già configurato con `@CrossOrigin(origins = "*")` sui controller per permettere le richieste dal frontend.

## 📁 Struttura File Creati
```
frontend/keyabita/
├── .env.development              # Variabili ambiente
├── src/
│   ├── lib/
│   │   └── apiClient.ts         # Client HTTP axios
│   ├── services/
│   │   ├── index.ts             # Export centrali
│   │   ├── cittaService.ts      # API città
│   │   ├── statoImmobileService.ts
│   │   ├── immobileService.ts   
│   │   └── valutazioneService.ts
│   └── components/
│       ├── ApiTest.tsx          # Test connessione
│       └── MultiStepForm/
│           └── MultiStepForm.tsx # Form aggiornato
```

## 🎉 Prossimi Passi
1. Testare tutte le funzionalità del form
2. Aggiungere gestione errori più sofisticata
3. Implementare autenticazione se necessaria
4. Aggiungere validazioni frontend
5. Migliorare l'UX con loader e feedback

Il collegamento è completo e funzionante! 🚀