DROP TABLE IF EXISTS valuations;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

CREATE TABLE utenti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  ruolo ENUM('PROPRIETARIO', 'AMMINISTRATORE') DEFAULT 'PROPRIETARIO',
  telefono VARCHAR(20),
  data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


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
