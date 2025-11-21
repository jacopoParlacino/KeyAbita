-- Inserimento dati nelle tabelle ruoli
INSERT INTO ruoli (id, nome) VALUES
(1, 'ADMIN'),
(2, 'OWNER'),
(3, 'AGENT');

-- Inserimento dati nelle tabelle utenti
-- Password per tutti gli utenti: "password123" (hashata con BCrypt)
INSERT INTO utenti (id, nome, cognome, email, ruolo, telefono, data_creazione, password) VALUES
(1, 'Mario', 'Rossi', 'mario.rossi@immobiliaris.it', 2, '+39 348 1234567', '2025-10-23', '$2a$10$WSgiHIFdUGmZO/BtTN3EtOYiJwgKr6XdSp1To6UmisH0uu.6MpcFS'),
(2, 'Laura', 'Bianchi', 'laura.bianchi@immobiliaris.it', 2, '+39 349 2345678', '2025-10-23', '$2a$10$MLsBGdxMtdf0R7Hihbeyq.lscTTA9AkTu9GpotmKhTHwC4KjdcyHu'),
(3, 'Paolo', 'Ghirlinzoni', 'paolo.ghirlinzoni@immobiliaris.it', 1, '+39 340 3456789', '2025-10-23', '$2a$10$dQUFGiSorzNjfgLWVgMQleOpZNscwdwlKF2plj8YCTq5FpXVAiz7W'),
(4, 'Giulia', 'Verdi', 'giulia.verdi@immobiliaris.it', 3, '+39 347 4567890', '2025-10-23', '$2a$10$vq5u0z9GTyHYY.pYPNIHauHKlIi3j0s1XIdp/MYuXUSEubG6aFx7O');

-- Inserimento dati nelle tabelle citta
INSERT INTO cap (cap, nome_citta, prezzo_metro_quadro) VALUES
('10100', 'Torino', 4500.00),
('12100', 'Cuneo', 2800.00),
('20100', 'Milano', 8000.00),
('14100', 'Asti', 3200.00);

-- Inserimento dati nelle tabelle stati_immobili
INSERT INTO stati_immobili (id, nome) VALUES
(1, 'Nuovo'),
(2, 'Ottime Condizioni'),
(3, 'Buone Condizioni'),
(4, 'Da ristrutturare');

-- Inserimento dati nelle tabelle metratura
INSERT INTO metratura (id, descrizione) VALUES
(1, '25-50'),
(2, '51-100'),
(3, '101-150'),
(4, 'Oltre 150');

-- Inserimento dati nelle tabelle immobili
INSERT INTO immobili (id, indirizzo, cap, stato_immobile, metratura, piano, numero_stanze, numero_bagni, balcone, garage, giardino, ascensore, anno_costruzione) VALUES
(1, 'Via Roma 15', '10100', 2, 3, 3, 4, 2, TRUE, FALSE, FALSE, TRUE, 2018),
(2, 'Corso Vittorio Emanuele 42', '10100', 1, 2, 1, 2, 1, TRUE, FALSE, FALSE, FALSE, 2020),
(3, 'Via Dante 8', '12100', 2, 4, 0, 5, 3, FALSE, TRUE, TRUE, FALSE, 2015),
(4, 'Piazza Garibaldi 3', '20100', 3, 3, 5, 3, 2, TRUE, TRUE, FALSE, TRUE, 2019),
(5, 'Via Mazzini 22', '14100', 1, 2, 2, 3, 1, FALSE, FALSE, FALSE, TRUE, 2021);

-- Inserimento dati nelle tabelle valutazioni
INSERT INTO valutazioni (id, valore_massimo, valore_stimato, valore_minimo, id_immobiliare) VALUES
(1, 220000.00, 215000.00, 210000.00, 1),
(2, 225000.00, 218000.00, 212000.00, 1),
(3, 155000.00, 150000.00, 145000.00, 2),
(4, 320000.00, 310000.00, 300000.00, 3),
(5, 275000.00, 265000.00, 255000.00, 4);

-- Inserimento dati nelle tabelle stati_richieste
INSERT INTO stati_richieste (id, nome, descrizione) VALUES
(1, 'nuova', 'Richiesta appena ricevuta'),
(2, 'in_lavorazione', 'Richiesta in corso di valutazione'),
(3, 'accettata', 'Richiesta accettata'),
(4, 'rifiutata', 'Richiesta rifiutata'),
(5, 'annullata', 'Richiesta annullata dal cliente');

-- Inserimento dati nelle tabelle richieste
INSERT INTO richieste (id, nome, cognome, email, numero, id_immobiliare, stato_richiesta, data) VALUES
(1, 'Luca', 'Ferrari', 'luca.ferrari@email.it', '+39 333 1111111', 1, 2, '2025-10-25'),
(2, 'Anna', 'Colombo', 'anna.colombo@email.it', '+39 334 2222222', 3, 3, '2025-10-26'),
(3, 'Marco', 'Russo', 'marco.russo@email.it', '+39 335 3333333', 4, 1, '2025-10-27'),
(4, 'Francesca', 'Romano', 'francesca.romano@email.it', '+39 336 4444444', 1, 1, '2025-10-28');

-- Inserimento dati nelle tabelle stati_contratti
INSERT INTO stati_contratti (id, nome, descrizione) VALUES
(1, 'in_preparazione', 'Contratto in fase di preparazione'),
(2, 'firmato', 'Contratto firmato dalle parti'),
(3, 'attivo', 'Contratto attivo'),
(4, 'concluso', 'Contratto concluso'),
(5, 'annullato', 'Contratto annullato');

-- Inserimento dati nelle tabelle contratti
INSERT INTO contratti (id, inizio_contratto, fine_contratto, id_richiesta, stato_contratto) VALUES
(1, '2025-11-01', '2025-11-30', 2, 2),
(2, '2025-11-05', '2026-11-05', 1, 1),
(3, '2025-10-20', '2025-11-20', 4, 3);

-- Reset delle sequenze IDENTITY per evitare conflitti di PK sui successivi INSERT
-- Nota: H2 supporta RESTART WITH solo su colonne IDENTITY/AUTO_INCREMENT
ALTER TABLE ruoli            ALTER COLUMN id RESTART WITH 4;
ALTER TABLE utenti           ALTER COLUMN id RESTART WITH 5;
ALTER TABLE stati_immobili   ALTER COLUMN id RESTART WITH 6;
ALTER TABLE metratura        ALTER COLUMN id RESTART WITH 6;
ALTER TABLE immobili         ALTER COLUMN id RESTART WITH 6;
ALTER TABLE valutazioni      ALTER COLUMN id RESTART WITH 6;
ALTER TABLE stati_richieste  ALTER COLUMN id RESTART WITH 6;
ALTER TABLE richieste        ALTER COLUMN id RESTART WITH 5;
ALTER TABLE stati_contratti  ALTER COLUMN id RESTART WITH 6;
ALTER TABLE contratti        ALTER COLUMN id RESTART WITH 4;