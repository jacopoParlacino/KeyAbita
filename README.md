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

Il database H2 è configurato in memoria. La struttura del database è organizzata nelle seguenti tabelle:

#### Tabella Properties
```sql
CREATE TABLE properties (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(255),
    type VARCHAR(50),      -- Appartamento, Villa, Ufficio, etc.
    size INT,             -- Metri quadrati
    rooms INT,            -- Numero di stanze
    price DECIMAL(10,2),  -- Prezzo di vendita/affitto
    status VARCHAR(50),   -- Disponibile, Venduto, Affittato
    description TEXT
);
```

#### Tabella Users
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100),
    role VARCHAR(20),     -- ADMIN, AGENT, CLIENT
    full_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabella Valuations
```sql
CREATE TABLE valuations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    property_id BIGINT,
    agent_id BIGINT,
    valuation_date DATE,
    market_value DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (agent_id) REFERENCES users(id)
);
```

Gli script SQL completi per la creazione e il popolamento iniziale del database sono disponibili nella cartella `db_KeyAbita/`.

## Struttura Packages

- `controller`: REST endpoints
- `model`: Entità JPA e DTO
- `repos`: Repository per l'accesso ai dati
- `services`: Logica di business

## Branches Git

- `main`: Branch principale stabile
