-- Drop existing tables if they exist
DROP TABLE IF EXISTS contratti;
DROP TABLE IF EXISTS stati_contratti;
DROP TABLE IF EXISTS richieste;
DROP TABLE IF EXISTS stati_richieste;
DROP TABLE IF EXISTS valutazioni;
DROP TABLE IF EXISTS immobili;
DROP TABLE IF EXISTS stati_immobili;
DROP TABLE IF EXISTS citta;
DROP TABLE IF EXISTS utenti;
DROP TABLE IF EXISTS ruoli;

-- Tabella utenti
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

-- Tabella ruoli
CREATE TABLE ruoli (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100)
);

-- Tabella città
CREATE TABLE citta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(50),
    descrizione TEXT(255)
);

-- Tabella stati_immobili
CREATE TABLE stati_immobili (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);

-- Tabella immobili
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
    anno_costruzione DATE,
    FOREIGN KEY (citta) REFERENCES citta(id),
    FOREIGN KEY (stato_immobile) REFERENCES stati_immobili(id)
);

-- Tabella valutazioni
CREATE TABLE valutazioni (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valore_massimo INT,
    valore_stimato INT,
    valore_minimo INT,
    id_immobiliare INT FK,
    FOREIGN KEY (id_immobiliare) REFERENCES immobili(id)
);

-- Tabella stati_richieste
CREATE TABLE stati_richieste (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);

-- Tabella richieste
CREATE TABLE richieste (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(30),
    cognome TEXT(30),
    email TEXT(100),
    numero TEXT(100),
    id_immobiliare INT FK,
    stato_richiesta INT FK,
    data DATE,
    FOREIGN KEY (id_immobiliare) REFERENCES immobili(id),
    FOREIGN KEY (stato_richiesta) REFERENCES stati_richieste(id)
);

-- Tabella stati_contratti
CREATE TABLE stati_contratti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT(100),
    descrizione TEXT(255)
);

-- Tabella contratti
CREATE TABLE contratti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inizio_contratto DATE,
    fine_contratto DATE,
    id_richiesta INT FK,
    stato_contratto INT FK,
    FOREIGN KEY (id_richiesta) REFERENCES richieste(id),
    FOREIGN KEY (stato_contratto) REFERENCES stati_contratti(id)
);
