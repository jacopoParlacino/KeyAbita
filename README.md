# KeyAbita — Quick frontend dev notes

Questo file contiene solo le informazioni essenziali per collegare il frontend React (Vite) al backend Spring Boot usando axios e la variabile d'ambiente `VITE_API_BASE_URL`.

## VITE_API_BASE_URL

- Cosa è: è la variabile d'ambiente che definisce la base URL delle API usata dal frontend.
- Dove si legge: in un'app Vite si accede con `import.meta.env.VITE_API_BASE_URL`.
- Valore di sviluppo consigliato: `http://localhost:8080/api`.
- File presente nel repo: `frontend/keyabita/.env.development` contiene la riga:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Nota: se cambi la porta del backend aggiorna anche questo valore.

## Perché usare axios

- axios è un client HTTP popolare, semplice da usare e con ottimo supporto TypeScript.
- Consente di creare un'istanza centralizzata con `baseURL`, header comuni, timeout e interceptor per error handling o auth.

## Installazione

Esegui nella cartella frontend:

```bash
cd frontend/keyabita
npm install axios
```

## Creare un client axios centralizzato (TypeScript)

Esempio di file `src/lib/apiClient.ts`:

```ts
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:8080/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Optional: interceptor per estrarre data e gestire errori
api.interceptors.response.use(
  response => response,
  error => {
    // qui puoi standardizzare la forma degli errori
    return Promise.reject(error);
  }
);

export default api;
```

## Esempi d'uso (servizi)

GET tutti gli elementi (es. città):

```ts
// src/services/citta.ts
import api from '../lib/apiClient';

export default {
  async getAll() {
    const { data } = await api.get('/citta');
    return data;
  }
};
```

POST per creare un immobile:

```ts
// src/services/immobili.ts
import api from '../lib/apiClient';

export default {
  async create(payload: any) {
    const { data } = await api.post('/immobili', payload);
    return data;
  }
};
```

Esempio in un componente React (submit):

```tsx
import ImmobiliService from '../services/immobili';

async function handleSubmit(formData) {
  try {
    const created = await ImmobiliService.create(formData);
    console.log('Immobile creato', created);
  } catch (err) {
    console.error('Errore POST immobile', err);
  }
}
```

## Note pratiche

- CORS: i controller backend sono annotati con `@CrossOrigin(origins = "*")` per permettere chiamate dal dev server Vite.
- Se dopo aver modificato `data.sql` ottieni errori di PRIMARY KEY violation sugli INSERT, riavvia il backend Spring Boot per ricaricare `data.sql` e riallineare le identity.
- Assicurati che il backend sia in esecuzione su `http://localhost:8080` (o aggiorna `VITE_API_BASE_URL`).

---

Se vuoi, posso applicare direttamente questa modifica al file `src/lib/apiClient.ts` e aggiornare i servizi per usare `axios` nel repository.
# KeyAbita

Applicazione web per la gestione di immobili sviluppata con Spring Boot e database H2.

## Struttura del Progetto

```
KeyAbita/
├── README.md
├── db_KeyAbita/               # Script SQL per il database
│   ├── immobiliaris_properties.sql
│   ├── immobiliaris_users.sql
│   └── immobiliaris_valuations.sql
└── keyabita/                  # Applicazione Spring Boot
    ├── pom.xml               # Dipendenze Maven
    └── src/
        └── main/
            ├── java/com/keyabita/keyabita/
            │   ├── controller/    # REST Controllers
            │   ├── model/         # Entità JPA
            │   ├── repos/         # Repository
                └── application.properties
```

## Tecnologie Utilizzate

- Java 21
- Spring Boot 3.5.6
- Spring Data JPA
- Spring Security
- H2 Database

Questa repo contiene sia il backend Spring Boot (cartella `keyabita/`) sia il frontend React (cartella `frontend/keyabita/`).

### Prerequisiti
- Java 21 + Maven
- Node.js LTS + npm

Esegui da Windows (cmd):

```cmd
cd C:\Users\Jacopo.Parlacino\Desktop\progettoLabratorio\KeyAbita\keyabita
```

Configurazione H2 (in-memory) in `src/main/resources/application.properties`:
- JDBC URL: `jdbc:h2:mem:keyabitadb`
- Console H2: http://localhost:8080/h2-console

Gli script `schema.sql` e `data.sql` inizializzano struttura e dati. Alla fine del `data.sql` le identity vengono riallineate per evitare conflitti sulle PK durante gli INSERT successivi.

### 2) Avvio Frontend (porta 5173)
Esegui da Windows (cmd):

```cmd
cd C:\Users\Jacopo.Parlacino\Desktop\progettoLabratorio\KeyAbita\frontend\keyabita
npm install
npm run dev
```

Il frontend usa Vite e legge l'URL base delle API dalla variabile di ambiente `VITE_API_BASE_URL`.
Per lo sviluppo è già presente `frontend/keyabita/.env.development` con:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

Se modifichi la porta del backend, aggiorna anche questo valore.

### 3) Verifica del collegamento
- Apri http://localhost:5173/ e naviga alla pagina di valutazione (`/valutazione`).
- Le tendine “Città” e “Stato immobile” sono caricate via GET dalle API.
- Inviando il form viene eseguito un POST su `/api/immobili`.
- Città: `GET /api/citta`, `GET /api/citta/{id}`, `GET /api/citta/nome/{nome}`, `POST /api/citta`
- Stati immobile: `GET /api/stati-immobile`, `GET /api/stati-immobile/{id}`, `GET /api/stati-immobile/nome/{nome}`, `POST /api/stati-immobile`
- Immobili: `GET /api/immobili`, `GET /api/immobili/{id}`, `GET /api/immobili/citta/{nome}`, `GET /api/immobili/stato-immobile/{nome)`, `GET /api/immobili/stanze/{n}`, `POST /api/immobili`
 - Immobili: `GET /api/immobili`, `GET /api/immobili/{id}`, `GET /api/immobili/citta/{nome}`, `GET /api/immobili/stato-immobile/{nome}`, `GET /api/immobili/stanze/{n}`, `POST /api/immobili`
- Valutazioni: `GET /api/valutazioni`, `GET /api/valutazioni/{id}`, `GET /api/valutazioni/immobile/{id}`, `GET /api/valutazioni/range?min=X&max=Y`, `POST /api/valutazioni`

Nota CORS: i controller sono annotati con `@CrossOrigin(origins = "*")`, quindi le chiamate dal dev server Vite non richiedono configurazioni aggiuntive.

### 5) Debug rapido
- Console H2: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:keyabitadb`)
- Verifica API da cmd:

```cmd
curl http://localhost:8080/api/citta
curl http://localhost:8080/api/immobili
```

Se ricevi errori di “PRIMARY KEY violation” sugli INSERT dopo il seed, riavvia il backend per ricaricare `data.sql` (le identity vengono riallineate a fine file).

## React: integrazione pratica step-by-step

Questa sezione spiega in modo pratico come collegare una app React (Vite + TypeScript) al backend Spring Boot di questo progetto.

1) Base URL e variabili d'ambiente
- Il frontend legge la base URL dalle env di Vite: `VITE_API_BASE_URL`.
- Nel repository è presente `frontend/keyabita/.env.development` con:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

2) Client API e servizi già pronti
- Usa il client centralizzato `frontend/keyabita/src/lib/apiClient.ts` che espone `get` e `post`.
- Usa i servizi sotto `frontend/keyabita/src/services/` (citta, statoImmobile, immobili, valutazioni) — così la logica API resta centralizzata.

3) Esempio pratico: caricare città in un componente

```tsx
// src/components/CittaSelect.tsx
import { useEffect, useState } from 'react';
import CittaService from '../services/citta';

export default function CittaSelect() {
    const [citta, setCitta] = useState<any[]>([]);

    useEffect(() => {
        CittaService.getAll()
            .then(setCitta)
            .catch(err => console.error('Errore caricamento citta', err));
    }, []);

    return (
        <select>
            {citta.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
        </select>
    );
}
```

4) Esempio pratico: POST immobile al submit del form

```tsx
import ImmobiliService from '../services/immobili';

async function handleSubmit(formData) {
    try {
        const created = await ImmobiliService.create(formData);
        console.log('Immobile creato', created); // contiene id
        // eventualmente invia anche una valutazione:
        // await ValutazioniService.create({ valoreMassimo: 220000, valoreStimato: 215000, valoreMinimo: 210000, immobile: { id: created.id } });
    } catch (err) {
        console.error(err);
        // mostra errore all'utente
    }
}
```

5) Alternative: fetch o axios
- fetch:

```ts
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/immobili`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
});
if (!res.ok) throw new Error(await res.text());
const data = await res.json();
```

- axios (se preferite):

```ts
import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
const { data } = await api.post('/immobili', payload);
```

6) Gestione errori e UX
- Disabilita il bottone di submit durante la chiamata.
- Mostra messaggi user-friendly in caso di errore (alert/toast/modal).
- Logga dettagli in console per debug.

7) Test end-to-end rapido
- Avvia backend: `mvnw.cmd spring-boot:run` (porta 8080).
- Avvia frontend: `npm run dev` (porta 5173).
- Apri http://localhost:5173/valutazione, compila e invia il form.
- Controlla Network in DevTools per vedere la POST `/api/immobili` e la response JSON contenente l'id creato.

8) Verifica DB
- Apri H2 Console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:keyabitadb`, user `sa`, pwd `password`.
- Esegui: `SELECT * FROM immobili ORDER BY id DESC;`

Suggerimento per il team: preferite usare i servizi già presenti (`src/services/*.ts`) e non ripetere fetch in ogni componente. Se volete, posso aggiungere un esempio completo (MultiStepForm che crea immobile + valutazione) nel repo.

## Setup Sviluppo

### Prerequisiti

- JDK 21
- Maven
- Git

### Clonare il Repository

```bash
git clone https://github.com/jacopoParlacino/KeyAbita.git
cd KeyAbita/keyabita
```

### Database

Il database H2 è configurato in memoria per facilitare lo sviluppo e i test. La struttura è stata progettata per gestire efficacemente le tre entità principali del sistema: immobili, utenti e valutazioni.

#### Design del Database

Il database è strutturato con le seguenti tabelle principali e di supporto:

### Tabelle Principali

#### Tabella Utenti
```sql
CREATE TABLE utenti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    cognome TEXT(100),
    email TEXT,
    ruolo INT FK,
    telefono TEXT(20),
    data_creazione DATE,
    password TEXT(255)
);
```

#### Tabella Immobili
```sql
CREATE TABLE immobili (
    id INT PRIMARY KEY AUTO_INCREMENT,
    indirizzo TEXT(255),
    citta INT FK,
    stato_immobile INT FK,
    piano INT,
    numero_stanze INT,
    numero_bagni INT,
    balcone BOOL,
    garage BOOL,
    giardino BOOL,
    anno_costruzione DATE
);
```

#### Tabella Valutazioni
```sql
CREATE TABLE valutazioni (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valore_massimo INT,
    valore_stimato INT,
    valore_minimo INT,
    id_immobiliare INT FK
);
```

### Tabelle di Gestione Richieste e Contratti

#### Tabella Richieste
```sql
CREATE TABLE richieste (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(30),
    cognome TEXT(30),
    email TEXT(100),
    numero TEXT(100),
    id_immobiliare INT FK,
    stato_richiesta INT FK,
    data DATE
);
```

#### Tabella Contratti
```sql
CREATE TABLE contratti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inizio_contratto DATE,
    fine_contratto DATE,
    id_richiesta INT FK,
    stato_contratto INT FK
);
```

### Tabelle di Supporto

#### Tabella Ruoli
```sql
CREATE TABLE ruoli (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100)
);
```

#### Tabella Città
```sql
CREATE TABLE citta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(50),
    descrizione TEXT(255)
);
```

#### Tabella Stati Immobili
```sql
CREATE TABLE stati_immobili (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);
```

#### Tabella Stati Richieste
```sql
CREATE TABLE stati_richieste (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);
```

#### Tabella Stati Contratti
```sql
CREATE TABLE stati_contratti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);
```

### Caratteristiche del Database

1. **Gestione Utenti**
   - Autenticazione completa
   - Gestione ruoli
   - Tracking attività

2. **Gestione Immobili**
   - Dettagli completi proprietà
   - Tracking stato immobile
   - Caratteristiche dettagliate

3. **Sistema Valutazioni**
   - Valutazioni multiple
   - Range di prezzi
   - Storico valutazioni

4. **Gestione Richieste**
   - Tracking completo
   - Stati multipli
   - Dati cliente

5. **Gestione Contratti**
   - Date inizio/fine
   - Stati contratto
   - Collegamenti a richieste

La tabella `vendite` è stata progettata per:
- Registrare i dettagli delle transazioni di vendita
- Tenere traccia degli acquirenti
- Gestire i dettagli finanziari della vendita
- Documentare le commissioni dell'agenzia

Gli script SQL completi per la creazione e il popolamento iniziale del database sono disponibili nella cartella `db_KeyAbita/`.

## Struttura Packages

- `controller`: REST endpoints
- `model`: Entità JPA e DTO
- `repos`: Repository per l'accesso ai dati
- `services`: Logica di business

## Branches Git

- `main`: Branch principale stabile
