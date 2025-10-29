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
