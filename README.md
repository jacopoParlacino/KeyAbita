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
            │   └── services/      # Business Logic
            └── resources/
                └── application.properties
```

## Tecnologie Utilizzate

- Java 21
- Spring Boot 3.5.6
- Spring Data JPA
- Spring Security
- H2 Database
- Maven

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

La struttura del database riflette le esigenze di un'agenzia immobiliare moderna:

1. **Gestione Immobili** (`immobili`)
2. **Gestione Utenti** (`utenti`)
3. **Gestione Valutazioni** (`valutazioni`)

#### Tabella Immobili
```sql
CREATE TABLE immobili (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    indirizzo VARCHAR(255),
    tipo VARCHAR(50),      -- Appartamento, Villa, Ufficio, etc.
    dimensione INT,        -- Metri quadrati
    stanze INT,           -- Numero di stanze
    prezzo DECIMAL(10,2), -- Prezzo di vendita/affitto
    stato VARCHAR(50),    -- Disponibile, Venduto, Affittato
    descrizione TEXT
);
```

La tabella `immobili` è stata progettata per:
- Tracciare le informazioni essenziali di ogni immobile
- Supportare diversi tipi di proprietà (appartamenti, ville, uffici)
- Gestire lo stato dell'immobile nel ciclo di vendita/affitto
- Fornire dettagli sufficienti per una prima valutazione

#### Tabella Utenti
```sql
CREATE TABLE utenti (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_utente VARCHAR(50) UNIQUE,
    password VARCHAR(255),  -- Lunghezza per hash sicuri
    email VARCHAR(100),
    ruolo VARCHAR(20),     -- ADMIN, AGENTE, CLIENTE
    nome_completo VARCHAR(100),
    telefono VARCHAR(20),
    data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

La tabella `utenti` implementa:
- Sistema di ruoli per differenziare le responsabilità
- Sicurezza con password hashate
- Tracciamento temporale delle registrazioni
- Dati di contatto essenziali

#### Tabella Valutazioni
```sql
CREATE TABLE valutazioni (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_immobile BIGINT,
    id_agente BIGINT,
    data_valutazione DATE,
    valore_mercato DECIMAL(10,2),
    note TEXT,
    FOREIGN KEY (id_immobile) REFERENCES immobili(id),
    FOREIGN KEY (id_agente) REFERENCES utenti(id)
);
```

La tabella `valutazioni` permette:
- Tracciamento storico delle valutazioni
- Responsabilità chiara (chi ha fatto la valutazione)
- Analisi del mercato nel tempo
- Note dettagliate per giustificare le valutazioni

Gli script SQL completi per la creazione e il popolamento iniziale del database sono disponibili nella cartella `db_KeyAbita/`.

## Struttura Packages

- `controller`: REST endpoints
- `model`: Entità JPA e DTO
- `repos`: Repository per l'accesso ai dati
- `services`: Logica di business

## Branches Git

- `main`: Branch principale stabile
