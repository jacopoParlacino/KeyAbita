# KeyAbita# KeyAbita — Quick frontend dev notes



Applicazione web per la gestione di immobili sviluppata con Spring Boot e database H2.Questo file contiene solo le informazioni essenziali per collegare il frontend React (Vite) al backend Spring Boot usando axios e la variabile d'ambiente `VITE_API_BASE_URL`.



## Backend (Spring Boot)## VITE_API_BASE_URL



### Struttura del Progetto- Cosa è: è la variabile d'ambiente che definisce la base URL delle API usata dal frontend.

- Dove si legge: in un'app Vite si accede con `import.meta.env.VITE_API_BASE_URL`.

```- Valore di sviluppo consigliato: `http://localhost:8080/api`.

KeyAbita/- File presente nel repo: `frontend/keyabita/.env.development` contiene la riga:

├── README.md

├── db_KeyAbita/               # Script SQL per il database```

│   ├── immobiliaris_properties.sqlVITE_API_BASE_URL=http://localhost:8080/api

│   ├── immobiliaris_users.sql```

│   └── immobiliaris_valuations.sql

└── keyabita/                  # Applicazione Spring BootNota: se cambi la porta del backend aggiorna anche questo valore.

    ├── pom.xml               # Dipendenze Maven

    └── src/## Perché usare axios

        └── main/

            ├── java/com/keyabita/keyabita/- axios è un client HTTP popolare, semplice da usare e con ottimo supporto TypeScript.

            │   ├── controller/    # REST Controllers- Consente di creare un'istanza centralizzata con `baseURL`, header comuni, timeout e interceptor per error handling o auth.

            │   ├── model/        # Entità JPA

            │   ├── repos/        # Repository## Installazione

            │   └── services/     # Business Logic

            └── resources/Esegui nella cartella frontend:

                └── application.properties

``````bash

cd frontend/keyabita

### Tecnologie Utilizzatenpm install axios

```

- Java 21

- Spring Boot 3.5.6## Creare un client axios centralizzato (TypeScript)

- Spring Data JPA

- Spring SecurityEsempio di file `src/lib/apiClient.ts`:

- H2 Database

- Maven```ts

import axios from 'axios';

### Setup Sviluppo

const baseURL = import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:8080/api';

#### Prerequisiti

const api = axios.create({

- JDK 21  baseURL,

- Maven  headers: { 'Content-Type': 'application/json' },

- Git  timeout: 10000,

});

#### Clonare il Repository

// Optional: interceptor per estrarre data e gestire errori

```bashapi.interceptors.response.use(

git clone https://github.com/jacopoParlacino/KeyAbita.git  response => response,

cd KeyAbita/keyabita  error => {

```    // qui puoi standardizzare la forma degli errori

    return Promise.reject(error);

### Database  }

);

Il database H2 è configurato in memoria per facilitare lo sviluppo e i test. La struttura è stata progettata per gestire efficacemente le tre entità principali del sistema: immobili, utenti e valutazioni.

export default api;

#### Design del Database```



Il database è strutturato con le seguenti tabelle principali e di supporto:## Esempi d'uso (servizi)



##### Tabelle PrincipaliGET tutti gli elementi (es. città):



###### Tabella Utenti```ts

```sql// src/services/citta.ts

CREATE TABLE utenti (import api from '../lib/apiClient';

    id INT PRIMARY KEY AUTO_INCREMENT,

    nome TEXT(100),export default {

    cognome TEXT(100),  async getAll() {

    email TEXT,    const { data } = await api.get('/citta');

    ruolo INT FK,    return data;

    telefono TEXT(20),  }

    data_creazione DATE,};

    password TEXT(255)```

);

```POST per creare un immobile:



###### Tabella Immobili```ts

```sql// src/services/immobili.ts

CREATE TABLE immobili (import api from '../lib/apiClient';

    id INT PRIMARY KEY AUTO_INCREMENT,

    indirizzo TEXT(255),export default {

    citta INT FK,  async create(payload: any) {

    stato_immobile INT FK,    const { data } = await api.post('/immobili', payload);

    piano INT,    return data;

    numero_stanze INT,  }

    numero_bagni INT,};

    balcone BOOL,```

    garage BOOL,

    giardino BOOL,Esempio in un componente React (submit):

    anno_costruzione DATE

);```tsx

```import ImmobiliService from '../services/immobili';



###### Tabella Valutazioniasync function handleSubmit(formData) {

```sql  try {

CREATE TABLE valutazioni (    const created = await ImmobiliService.create(formData);

    id INT PRIMARY KEY AUTO_INCREMENT,    console.log('Immobile creato', created);

    valore_massimo INT,  } catch (err) {

    valore_stimato INT,    console.error('Errore POST immobile', err);

    valore_minimo INT,  }

    id_immobiliare INT FK}

);```

```

## Note pratiche

##### Tabelle di Gestione Richieste e Contratti

- CORS: i controller backend sono annotati con `@CrossOrigin(origins = "*")` per permettere chiamate dal dev server Vite.

###### Tabella Richieste- Se dopo aver modificato `data.sql` ottieni errori di PRIMARY KEY violation sugli INSERT, riavvia il backend Spring Boot per ricaricare `data.sql` e riallineare le identity.

```sql- Assicurati che il backend sia in esecuzione su `http://localhost:8080` (o aggiorna `VITE_API_BASE_URL`).

CREATE TABLE richieste (

    id INT PRIMARY KEY AUTO_INCREMENT,---

    nome TEXT(30),

    cognome TEXT(30),Se vuoi, posso applicare direttamente questa modifica al file `src/lib/apiClient.ts` e aggiornare i servizi per usare `axios` nel repository.

    email TEXT(100),# KeyAbita

    numero TEXT(100),

    id_immobiliare INT FK,Applicazione web per la gestione di immobili sviluppata con Spring Boot e database H2.

    stato_richiesta INT FK,

    data DATE## Struttura del Progetto

);

``````

KeyAbita/

###### Tabella Contratti├── README.md

```sql├── db_KeyAbita/               # Script SQL per il database

CREATE TABLE contratti (│   ├── immobiliaris_properties.sql

    id INT PRIMARY KEY AUTO_INCREMENT,│   ├── immobiliaris_users.sql

    inizio_contratto DATE,│   └── immobiliaris_valuations.sql

    fine_contratto DATE,└── keyabita/                  # Applicazione Spring Boot

    id_richiesta INT FK,    ├── pom.xml               # Dipendenze Maven

    stato_contratto INT FK    └── src/

);        └── main/

```            ├── java/com/keyabita/keyabita/

            │   ├── controller/    # REST Controllers

##### Tabelle di Supporto            │   ├── model/         # Entità JPA

            │   ├── repos/         # Repository

###### Tabella Ruoli                └── application.properties

```sql```

CREATE TABLE ruoli (

    id INT PRIMARY KEY AUTO_INCREMENT,## Tecnologie Utilizzate

    nome TEXT(100)

);- Java 21

```- Spring Boot 3.5.6

- Spring Data JPA

###### Tabella Città- Spring Security

```sql- H2 Database

CREATE TABLE citta (

    id INT PRIMARY KEY AUTO_INCREMENT,Questa repo contiene sia il backend Spring Boot (cartella `keyabita/`) sia il frontend React (cartella `frontend/keyabita/`).

    nome TEXT(50),

    descrizione TEXT(255)### Prerequisiti

);- Java 21 + Maven

```- Node.js LTS + npm



###### Tabella Stati ImmobiliEsegui da Windows (cmd):

```sql

CREATE TABLE stati_immobili (```cmd

    id INT PRIMARY KEY AUTO_INCREMENT,cd C:\Users\Jacopo.Parlacino\Desktop\progettoLabratorio\KeyAbita\keyabita

    nome TEXT(100),```

    descrizione TEXT(255)

);Configurazione H2 (in-memory) in `src/main/resources/application.properties`:

```- JDBC URL: `jdbc:h2:mem:keyabitadb`

- Console H2: http://localhost:8080/h2-console

###### Tabella Stati Richieste

```sqlGli script `schema.sql` e `data.sql` inizializzano struttura e dati. Alla fine del `data.sql` le identity vengono riallineate per evitare conflitti sulle PK durante gli INSERT successivi.

CREATE TABLE stati_richieste (

    id INT PRIMARY KEY AUTO_INCREMENT,### 2) Avvio Frontend (porta 5173)

    nome TEXT(100),Esegui da Windows (cmd):

    descrizione TEXT(255)

);```cmd

```cd C:\Users\Jacopo.Parlacino\Desktop\progettoLabratorio\KeyAbita\frontend\keyabita

npm install

###### Tabella Stati Contrattinpm run dev

```sql```

CREATE TABLE stati_contratti (

    id INT PRIMARY KEY AUTO_INCREMENT,Il frontend usa Vite e legge l'URL base delle API dalla variabile di ambiente `VITE_API_BASE_URL`.

    nome TEXT(100),Per lo sviluppo è già presente `frontend/keyabita/.env.development` con:

    descrizione TEXT(255)```

);VITE_API_BASE_URL=http://localhost:8080/api

``````



### Caratteristiche del DatabaseSe modifichi la porta del backend, aggiorna anche questo valore.



1. **Gestione Utenti**### 3) Verifica del collegamento

   - Autenticazione completa- Apri http://localhost:5173/ e naviga alla pagina di valutazione (`/valutazione`).

   - Gestione ruoli- Le tendine “Città” e “Stato immobile” sono caricate via GET dalle API.

   - Tracking attività- Inviando il form viene eseguito un POST su `/api/immobili`.

- Città: `GET /api/citta`, `GET /api/citta/{id}`, `GET /api/citta/nome/{nome}`, `POST /api/citta`

2. **Gestione Immobili**- Stati immobile: `GET /api/stati-immobile`, `GET /api/stati-immobile/{id}`, `GET /api/stati-immobile/nome/{nome}`, `POST /api/stati-immobile`

   - Dettagli completi proprietà- Immobili: `GET /api/immobili`, `GET /api/immobili/{id}`, `GET /api/immobili/citta/{nome}`, `GET /api/immobili/stato-immobile/{nome)`, `GET /api/immobili/stanze/{n}`, `POST /api/immobili`

   - Tracking stato immobile - Immobili: `GET /api/immobili`, `GET /api/immobili/{id}`, `GET /api/immobili/citta/{nome}`, `GET /api/immobili/stato-immobile/{nome}`, `GET /api/immobili/stanze/{n}`, `POST /api/immobili`

   - Caratteristiche dettagliate- Valutazioni: `GET /api/valutazioni`, `GET /api/valutazioni/{id}`, `GET /api/valutazioni/immobile/{id}`, `GET /api/valutazioni/range?min=X&max=Y`, `POST /api/valutazioni`



3. **Sistema Valutazioni**Nota CORS: i controller sono annotati con `@CrossOrigin(origins = "*")`, quindi le chiamate dal dev server Vite non richiedono configurazioni aggiuntive.

   - Valutazioni multiple

   - Range di prezzi### 5) Debug rapido

   - Storico valutazioni- Console H2: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:keyabitadb`)

- Verifica API da cmd:

4. **Gestione Richieste**

   - Tracking completo```cmd

   - Stati multiplicurl http://localhost:8080/api/citta

   - Dati clientecurl http://localhost:8080/api/immobili

```

5. **Gestione Contratti**

   - Date inizio/fineSe ricevi errori di “PRIMARY KEY violation” sugli INSERT dopo il seed, riavvia il backend per ricaricare `data.sql` (le identity vengono riallineate a fine file).

   - Stati contratto

   - Collegamenti a richieste## React: integrazione pratica step-by-step



La tabella `vendite` è stata progettata per:Questa sezione spiega in modo pratico come collegare una app React (Vite + TypeScript) al backend Spring Boot di questo progetto.

- Registrare i dettagli delle transazioni di vendita

- Tenere traccia degli acquirenti1) Base URL e variabili d'ambiente

- Gestire i dettagli finanziari della vendita- Il frontend legge la base URL dalle env di Vite: `VITE_API_BASE_URL`.

- Documentare le commissioni dell'agenzia- Nel repository è presente `frontend/keyabita/.env.development` con:



Gli script SQL completi per la creazione e il popolamento iniziale del database sono disponibili nella cartella `db_KeyAbita/`.```

VITE_API_BASE_URL=http://localhost:8080/api

### Struttura Packages```



- `controller`: REST endpoints2) Client API e servizi già pronti

- `model`: Entità JPA e DTO- Usa il client centralizzato `frontend/keyabita/src/lib/apiClient.ts` che espone `get` e `post`.

- `repos`: Repository per l'accesso ai dati- Usa i servizi sotto `frontend/keyabita/src/services/` (citta, statoImmobile, immobili, valutazioni) — così la logica API resta centralizzata.

- `services`: Logica di business

3) Esempio pratico: caricare città in un componente

### Branches Git

```tsx

- `main`: Branch principale stabile// src/components/CittaSelect.tsx

import { useEffect, useState } from 'react';

---import CittaService from '../services/citta';



## Frontend (React + Vite)export default function CittaSelect() {

    const [citta, setCitta] = useState<any[]>([]);

Questa sezione contiene le informazioni essenziali per collegare il frontend React (Vite) al backend Spring Boot usando axios e la variabile d'ambiente `VITE_API_BASE_URL`.

    useEffect(() => {

### VITE_API_BASE_URL        CittaService.getAll()

            .then(setCitta)

- Cosa è: è la variabile d'ambiente che definisce la base URL delle API usata dal frontend.            .catch(err => console.error('Errore caricamento citta', err));

- Dove si legge: in un'app Vite si accede con `import.meta.env.VITE_API_BASE_URL`.    }, []);

- Valore di sviluppo consigliato: `http://localhost:8080/api`.

- File presente nel repo: `frontend/keyabita/.env.development` contiene la riga:    return (

        <select>

```            {citta.map(c => (

VITE_API_BASE_URL=http://localhost:8080/api                <option key={c.id} value={c.id}>{c.nome}</option>

```            ))}

        </select>

Nota: se cambi la porta del backend aggiorna anche questo valore.    );

}

### Perché usare axios```



- axios è un client HTTP popolare, semplice da usare e con ottimo supporto TypeScript.4) Esempio pratico: POST immobile al submit del form

- Consente di creare un'istanza centralizzata con `baseURL`, header comuni, timeout e interceptor per error handling o auth.

```tsx

### Installazioneimport ImmobiliService from '../services/immobili';



Esegui nella cartella frontend:async function handleSubmit(formData) {

    try {

```bash        const created = await ImmobiliService.create(formData);

cd frontend/keyabita        console.log('Immobile creato', created); // contiene id

npm install axios        // eventualmente invia anche una valutazione:

```        // await ValutazioniService.create({ valoreMassimo: 220000, valoreStimato: 215000, valoreMinimo: 210000, immobile: { id: created.id } });

    } catch (err) {

### Creare un client axios centralizzato (TypeScript)        console.error(err);

        // mostra errore all'utente

Esempio di file `src/lib/apiClient.ts`:    }

}

```ts```

import axios from 'axios';

5) Alternative: fetch o axios

const baseURL = import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:8080/api';- fetch:



const api = axios.create({```ts

  baseURL,const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/immobili`, {

  headers: { 'Content-Type': 'application/json' },    method: 'POST',

  timeout: 10000,    headers: { 'Content-Type': 'application/json' },

});    body: JSON.stringify(payload),

});

// Optional: interceptor per estrarre data e gestire erroriif (!res.ok) throw new Error(await res.text());

api.interceptors.response.use(const data = await res.json();

  response => response,```

  error => {

    // qui puoi standardizzare la forma degli errori- axios (se preferite):

    return Promise.reject(error);

  }```ts

);import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export default api;const { data } = await api.post('/immobili', payload);

``````



### Esempi d'uso (servizi)6) Gestione errori e UX

- Disabilita il bottone di submit durante la chiamata.

GET tutti gli elementi (es. città):- Mostra messaggi user-friendly in caso di errore (alert/toast/modal).

- Logga dettagli in console per debug.

```ts

// src/services/citta.ts7) Test end-to-end rapido

import api from '../lib/apiClient';- Avvia backend: `mvnw.cmd spring-boot:run` (porta 8080).

- Avvia frontend: `npm run dev` (porta 5173).

export default {- Apri http://localhost:5173/valutazione, compila e invia il form.

  async getAll() {- Controlla Network in DevTools per vedere la POST `/api/immobili` e la response JSON contenente l'id creato.

    const { data } = await api.get('/citta');

    return data;8) Verifica DB

  }- Apri H2 Console: http://localhost:8080/h2-console

};- JDBC URL: `jdbc:h2:mem:keyabitadb`, user `sa`, pwd `password`.

```- Esegui: `SELECT * FROM immobili ORDER BY id DESC;`



POST per creare un immobile:Suggerimento per il team: preferite usare i servizi già presenti (`src/services/*.ts`) e non ripetere fetch in ogni componente. Se volete, posso aggiungere un esempio completo (MultiStepForm che crea immobile + valutazione) nel repo.



```ts## Setup Sviluppo

// src/services/immobili.ts

import api from '../lib/apiClient';### Prerequisiti



export default {- JDK 21

  async create(payload: any) {- Maven

    const { data } = await api.post('/immobili', payload);- Git

    return data;

  }### Clonare il Repository

};

``````bash

git clone https://github.com/jacopoParlacino/KeyAbita.git

Esempio in un componente React (submit):cd KeyAbita/keyabita

```

```tsx

import ImmobiliService from '../services/immobili';### Database



async function handleSubmit(formData) {Il database H2 è configurato in memoria per facilitare lo sviluppo e i test. La struttura è stata progettata per gestire efficacemente le tre entità principali del sistema: immobili, utenti e valutazioni.

  try {

    const created = await ImmobiliService.create(formData);#### Design del Database

    console.log('Immobile creato', created);

  } catch (err) {Il database è strutturato con le seguenti tabelle principali e di supporto:

    console.error('Errore POST immobile', err);

  }### Tabelle Principali

}

```#### Tabella Utenti

```sql

### Note praticheCREATE TABLE utenti (

    id INT PRIMARY KEY AUTO_INCREMENT,

- CORS: i controller backend sono annotati con `@CrossOrigin(origins = "*")` per permettere chiamate dal dev server Vite.    nome TEXT(100),

- Se dopo aver modificato `data.sql` ottieni errori di PRIMARY KEY violation sugli INSERT, riavvia il backend Spring Boot per ricaricare `data.sql` e riallineare le identity.    cognome TEXT(100),

- Assicurati che il backend sia in esecuzione su `http://localhost:8080` (o aggiorna `VITE_API_BASE_URL`).    email TEXT,

    ruolo INT FK,

---    telefono TEXT(20),

    data_creazione DATE,

Se vuoi, posso applicare direttamente questa modifica al file `src/lib/apiClient.ts` e aggiornare i servizi per usare `axios` nel repository.    password TEXT(255)
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
