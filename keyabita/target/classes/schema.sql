-- Drop existing tables if they exist (in dependency order)
DROP TABLE IF EXISTS contratti;
DROP TABLE IF EXISTS stati_contratti;
DROP TABLE IF EXISTS richieste;
DROP TABLE IF EXISTS stati_richieste;
DROP TABLE IF EXISTS valutazioni;
DROP TABLE IF EXISTS immobili;
DROP TABLE IF EXISTS stati_immobili;
DROP TABLE IF EXISTS cap;
DROP TABLE IF EXISTS utenti;
DROP TABLE IF EXISTS ruoli;

-- Tabella ruoli (master table)
CREATE TABLE ruoli (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabella utenti
CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    ruolo INT,
    telefono VARCHAR(20),
    data_creazione DATE,
    password VARCHAR(255),
    FOREIGN KEY (ruolo) REFERENCES ruoli(id) ON DELETE SET NULL
);

-- Tabella cap
CREATE TABLE cap (
    cap VARCHAR(10) PRIMARY KEY,
    nome_citta VARCHAR(100) NOT NULL,
    prezzo_metro_quadro DOUBLE NOT NULL
);

-- Tabella stati_immobili (master table)
CREATE TABLE stati_immobili (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrizione VARCHAR(255)
);

-- Tabella immobili
CREATE TABLE immobili (
    id INT AUTO_INCREMENT PRIMARY KEY,
    indirizzo VARCHAR(255),
    cap VARCHAR(10),
    stato_immobile INT,
    piano INT,
    numero_stanze INT,
    numero_bagni INT,
    balcone BOOLEAN DEFAULT FALSE,
    garage BOOLEAN DEFAULT FALSE,
    giardino BOOLEAN DEFAULT FALSE,
    ascensore BOOLEAN DEFAULT FALSE,
    anno_costruzione INT,
    FOREIGN KEY (cap) REFERENCES cap(cap) ON DELETE SET NULL,
    FOREIGN KEY (stato_immobile) REFERENCES stati_immobili(id) ON DELETE SET NULL
);

-- Tabella valutazioni
CREATE TABLE valutazioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valore_massimo DECIMAL(10,2),
    valore_stimato DECIMAL(10,2),
    valore_minimo DECIMAL(10,2),
    id_immobiliare INT,
    FOREIGN KEY (id_immobiliare) REFERENCES immobili(id) ON DELETE CASCADE
);

-- Tabella stati_richieste (master table)
CREATE TABLE stati_richieste (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrizione VARCHAR(255)
);

-- Tabella richieste
CREATE TABLE richieste (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    email VARCHAR(100),
    numero VARCHAR(100),
    id_immobiliare INT,
    stato_richiesta INT,
    data DATE,
    FOREIGN KEY (id_immobiliare) REFERENCES immobili(id) ON DELETE CASCADE,
    FOREIGN KEY (stato_richiesta) REFERENCES stati_richieste(id) ON DELETE SET NULL
);

-- Tabella stati_contratti (master table)
CREATE TABLE stati_contratti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrizione VARCHAR(255)
);

-- Tabella contratti
CREATE TABLE contratti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inizio_contratto DATE,
    fine_contratto DATE,
    id_richiesta INT,
    stato_contratto INT,
    FOREIGN KEY (id_richiesta) REFERENCES richieste(id) ON DELETE CASCADE,
    FOREIGN KEY (stato_contratto) REFERENCES stati_contratti(id) ON DELETE SET NULL
);

-- Indici per migliorare le performance delle query
CREATE INDEX idx_ruolo ON utenti(ruolo);
CREATE INDEX idx_cap ON immobili(cap);
CREATE INDEX idx_stato_immobile ON immobili(stato_immobile);
CREATE INDEX idx_id_immobiliare_valutazioni ON valutazioni(id_immobiliare);
CREATE INDEX idx_id_immobiliare_richieste ON richieste(id_immobiliare);
CREATE INDEX idx_stato_richiesta ON richieste(stato_richiesta);
CREATE INDEX idx_id_richiesta ON contratti(id_richiesta);
CREATE INDEX idx_stato_contratto ON contratti(stato_contratto);
