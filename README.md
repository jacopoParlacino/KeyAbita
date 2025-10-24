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

#### Tabella Utenti
```sql
CREATE TABLE utenti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  ruolo ENUM('PROPRIETARIO', 'AMMINISTRATORE') DEFAULT 'PROPRIETARIO',
  telefono VARCHAR(20),
  data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

La tabella `utenti` è stata progettata per:
- Gestire i dati anagrafici degli utenti
- Differenziare i ruoli tra proprietari e amministratori
- Mantenere i contatti essenziali
- Tracciare la data di registrazione

#### Tabella Immobili
```sql
CREATE TABLE immobili (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proprietario_id INT NOT NULL,
  indirizzo VARCHAR(200),
  citta VARCHAR(100),
  metri_quadri DECIMAL(6,2),
  numero_stanze INT,
  numero_bagni INT,
  piano INT,
  stato_immobile ENUM('nuovo', 'buono', 'da_ristrutturare') DEFAULT 'buono',
  anno_costruzione INT,
  prezzo_richiesto DECIMAL(12,2),
  valutazione_stimata DECIMAL(12,2),
  stato_pratica ENUM('in_attesa', 'valutato', 'in_contratto', 'venduto') DEFAULT 'in_attesa',
  data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proprietario_id) REFERENCES utenti(id)
);
```

La tabella `immobili` è stata progettata per:
- Tracciare dettagli completi degli immobili
- Collegare ogni immobile al suo proprietario
- Gestire lo stato dell'immobile e della pratica di vendita
- Monitorare prezzi e valutazioni

#### Tabella Valutazioni
```sql
CREATE TABLE valutazioni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  immobile_id INT NOT NULL,
  valore_stimato DECIMAL(12,2),
  valore_minimo DECIMAL(12,2),
  valore_massimo DECIMAL(12,2),
  metodo ENUM('manuale', 'istantaneo') DEFAULT 'manuale',
  data_valutazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (immobile_id) REFERENCES immobili(id)
);
```

La tabella `valutazioni` permette:
- Registrare valutazioni dettagliate degli immobili
- Tracciare valori stimati, minimi e massimi
- Distinguere tra valutazioni manuali e automatiche
- Mantenere uno storico delle valutazioni

#### Tabella Vendite
```sql
CREATE TABLE vendite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  immobile_id INT NOT NULL,
  acquirente_nome VARCHAR(100),
  acquirente_cognome VARCHAR(100),
  acquirente_email VARCHAR(150),
  prezzo_finale DECIMAL(12,2),
  data_vendita DATE,
  commissione_agenzia DECIMAL(12,2),
  metodo_pagamento ENUM('bonifico', 'contanti', 'mutuo', 'altro') DEFAULT 'bonifico',
  note TEXT,
  FOREIGN KEY (immobile_id) REFERENCES immobili(id)
);
```

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
