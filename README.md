# 🏠 KeyAbita

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

</div>

Applicazione web per la gestione di immobili sviluppata con Spring Boot e React/TypeScript. KeyAbita offre una piattaforma completa per la gestione di proprietà immobiliari, valutazioni e contratti.

## 📋 Caratteristiche Principali

- 🏘️ **Gestione Immobili**: Catalogo completo delle proprietà con dettagli e stato
- 💰 **Sistema di Valutazione**: Valutazioni automatiche basate su parametri multipli
- 📝 **Gestione Contratti**: Tracking completo del ciclo di vita dei contratti
- 🌍 **Multi-città**: Supporto per diverse località con informazioni specifiche
- 📊 **Dashboard**: Interfaccia intuitiva per la gestione delle proprietà
- 🔒 **Autenticazione**: Sistema di gestione utenti con ruoli differenziati

## 🛠️ Tecnologie Utilizzate

### Backend
- ☕ **Java 21**: Ultima versione stabile con feature moderne
- 🍃 **Spring Boot 3.5.6**: Framework per applicazioni enterprise
- 🗄️ **Spring Data JPA**: ORM per la gestione del database
- 💾 **H2 Database**: Database in-memory per sviluppo rapido
- 🔧 **Maven**: Gestione dipendenze e build automation

### Frontend
- ⚛️ **React 18**: Library UI con Concurrent Features
- 📘 **TypeScript**: Tipizzazione statica per codice più robusto
- ⚡ **Vite**: Build tool moderno e performante
- 🎨 **SCSS Modules**: Styling modulare e scoped
- 🔄 **Axios**: Client HTTP per le chiamate API

## 📁 Struttura del Progetto

```
KeyAbita/
├── README.md
├── backend/                  # Backend Spring Boot
│   ├── pom.xml             # Dipendenze Maven
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/keyabita/keyabita/
│           │       ├── controller/     # REST Controllers
│           │       ├── model/          # Entità JPA
│           │       ├── repos/          # Repository
│           │       └── services/       # Business Logic
│           └── resources/
│               ├── application.properties
│               ├── schema.sql
│               └── data.sql
└── frontend/                 # Frontend React/TypeScript
    └── keyabita/
        ├── src/
        │   ├── components/   # Componenti React riutilizzabili
        │   ├── pages/        # Pagine dell'applicazione
        │   └── styles/       # File SCSS globali e variabili
        ├── public/           # Asset statici
        ├── package.json
        └── vite.config.ts
```

## 🚀 Setup Sviluppo

### Prerequisiti
- ☕ JDK 21
- 📦 Maven
- 💻 Node.js LTS + npm
- 🔄 Git

### 1) Avvio Backend (porta 8080)

```cmd
cd backend
mvnw spring-boot:run
```

Configurazione H2 (in-memory):
- 🔗 JDBC URL: `jdbc:h2:mem:keyabitadb`
- 🖥️ Console H2: http://localhost:8080/h2-console

Gli script `schema.sql` e `data.sql` inizializzano struttura e dati in automatico.

### 2) Avvio Frontend (porta 5173)

```cmd
cd frontend/keyabita
npm install
npm run dev
```

## 🔌 API Endpoints

### 🏙️ Città
- `GET /api/citta` - Lista tutte le città
- `GET /api/citta/{id}` - Dettagli città specifica
- `GET /api/citta/nome/{nome}` - Cerca per nome
- `POST /api/citta` - Aggiunge nuova città

### 🏘️ Immobili
- `GET /api/immobili` - Lista tutti gli immobili
- `GET /api/immobili/{id}` - Dettagli immobile
- `GET /api/immobili/citta/{nome}` - Filtra per città
- `GET /api/immobili/stato-immobile/{nome}` - Filtra per stato
- `GET /api/immobili/stanze/{n}` - Filtra per numero stanze
- `POST /api/immobili` - Aggiunge nuovo immobile

### 💰 Valutazioni
- `GET /api/valutazioni` - Lista tutte le valutazioni
- `GET /api/valutazioni/{id}` - Dettagli valutazione
- `GET /api/valutazioni/immobile/{id}` - Valutazioni per immobile
- `GET /api/valutazioni/range?min=X&max=Y` - Filtra per range
- `POST /api/valutazioni` - Aggiunge nuova valutazione

## 🗄️ Struttura Database

### 📊 Tabelle Principali
- `utenti`: Sistema completo di autenticazione e autorizzazione
  - Gestione profili utente
  - Ruoli e permessi
  - Tracking attività
- `immobili`: Gestione proprietà immobiliari
  - Dettagli tecnici
  - Caratteristiche
  - Stato attuale
- `valutazioni`: Sistema di valutazione
  - Range di prezzi
  - Storico valutazioni
  - Analisi di mercato
- `richieste`: Gestione richieste clienti
  - Tracking stato
  - Dati cliente
  - Timeline
- `contratti`: Gestione contratti
  - Date inizio/fine
  - Condizioni
  - Collegamenti a richieste

### 🔧 Tabelle di Supporto
- `ruoli`: Gestione ruoli utente
- `citta`: Anagrafica città
- `stati_immobili`: Workflow immobili
- `stati_richieste`: Workflow richieste
- `stati_contratti`: Workflow contratti

## 🎨 Struttura Frontend

### 🧩 Componenti
- `Header`: Navigazione responsive
- `Hero`: Landing page accattivante
- `FeatureSection`: Showcase funzionalità
- `MultiStepForm`: Form wizard valutazioni
- `Footer`: Collegamenti e informazioni

### 📱 Pagine
- `Home`: Landing page ottimizzata
- `Valuation`: Processo di valutazione guidato

## 🔍 Debug e Sviluppo

### 🔧 Backend
- 🖥️ H2 Console: http://localhost:8080/h2-console
- 🔌 Test API: `curl http://localhost:8080/api/citta`

### 💻 Frontend
- 🌐 Dev server: http://localhost:5173
- 🔍 Network tab per debugging

### ⚠️ Note Importanti
- CORS: Controllers annotati con `@CrossOrigin(origins = "*")`
- Database: Riavviare backend dopo modifiche a `data.sql`
- Environment: Controllare `VITE_API_BASE_URL` per connessione API

## 👥 Contributing

Le contribuzioni sono benvenute! Per favore:
1. 🍴 Fai il fork del progetto
2. 🔧 Crea un branch per le tue modifiche
3. 💾 Committa i cambiamenti
4. 🚀 Fai il push sul tuo fork
5. ✅ Apri una Pull Request

## 📝 License

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.