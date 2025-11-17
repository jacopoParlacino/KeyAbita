-- Inserimento dati nelle tabelle ruoli
INSERT INTO ruoli (id, nome) VALUES
(1, 'Cliente'),
(2, 'Agenti');

-- Inserimento dati nelle tabelle utenti
INSERT INTO utenti (id, nome, cognome, email, ruolo, telefono, data_creazione, password) VALUES
(1, 'Mario', 'Rossi', 'mario.rossi@email.it', 1, '+39 348 1234567', '2025-10-23', 'hash_mario'),
(2, 'Laura', 'Bianchi', 'laura.bianchi@email.it', 1, '+39 349 2345678', '2025-10-23', 'hash_laura'),
(3, 'Paolo', 'Ghirlinzoni', 'paolo.ghirlinzoni@keyabita.it', 2, '+39 340 3456789', '2025-10-23', 'hash_paolo'),
(4, 'Giulia', 'Verdi', 'giulia.verdi@keyabita.it', 2, '+39 347 4567890', '2025-10-23', 'hash_giulia'),
(5, 'Francesco', 'Martinelli', 'francesco.martinelli@email.it', 1, '+39 351 5678901', '2025-11-01', 'hash_francesco'),
(6, 'Simona', 'Ferrari', 'simona.ferrari@keyabita.it', 2, '+39 352 6789012', '2025-11-05', 'hash_simona');

-- Inserimento dati nelle tabelle citta
INSERT INTO citta (id, nome, descrizione) VALUES
(1, 'Torino', 'Città capoluogo del Piemonte'),
(2, 'Cuneo', 'Città del Piemonte meridionale'),
(3, 'Alessandria', 'Città del Piemonte orientale'),
(4, 'Asti', 'Città del Piemonte');

-- Inserimento dati nelle tabelle stati_immobili
INSERT INTO stati_immobili (id, nome, descrizione) VALUES
(1, 'in_attesa', 'Immobile in attesa di valutazione'),
(2, 'valutato', 'Immobile valutato'),
(3, 'in_vendita', 'Immobile disponibile per la vendita'),
(4, 'venduto', 'Immobile venduto'),
(5, 'ritirato', 'Immobile ritirato dal mercato');

-- Inserimento dati nelle tabelle immobili
INSERT INTO immobili (id, indirizzo, citta, stato_immobile, piano, numero_stanze, numero_bagni, balcone, garage, giardino, anno_costruzione) VALUES
(1, 'Via Roma 15', 1, 2, 3, 4, 2, TRUE, FALSE, FALSE, 2018),
(2, 'Corso Vittorio Emanuele 42', 1, 1, 1, 2, 1, TRUE, FALSE, FALSE, 2020),
(3, 'Via Dante 8', 2, 2, 0, 5, 3, FALSE, TRUE, TRUE, 2015),
(4, 'Piazza Garibaldi 3', 3, 3, 5, 3, 2, TRUE, TRUE, FALSE, 2019),
(5, 'Via Mazzini 22', 4, 1, 2, 3, 1, FALSE, FALSE, FALSE, 2021);

-- Inserimento dati nelle tabelle valutazioni
INSERT INTO valutazioni (id, valore_massimo, valore_stimato, valore_minimo, id_immobiliare, data_creazione) VALUES
(1, 220000.00, 215000.00, 210000.00, 1, '2025-11-10'),
(2, 225000.00, 218000.00, 212000.00, 1, '2025-11-12'),
(3, 155000.00, 150000.00, 145000.00, 2, '2025-11-08'),
(4, 320000.00, 310000.00, 300000.00, 3, '2025-11-05'),
(5, 275000.00, 265000.00, 255000.00, 4, '2025-11-14');

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

-- Inserimento permessi default per agenti (solo visualizzazione)
INSERT INTO permessi_agenti (id, id_agente, modulo, permesso, abilitato, data_creazione) VALUES
-- Permessi per Paolo Ghirlinzoni (id: 3)
(1, 3, 'dashboard', 'visualizza', TRUE, '2025-11-16'),
(2, 3, 'valutazioni', 'visualizza', TRUE, '2025-11-16'),
(3, 3, 'clienti', 'visualizza', TRUE, '2025-11-16'),
(4, 3, 'contratti', 'visualizza', TRUE, '2025-11-16'),
-- Permessi per Giulia Verdi (id: 4)
(5, 4, 'dashboard', 'visualizza', TRUE, '2025-11-16'),
(6, 4, 'valutazioni', 'visualizza', TRUE, '2025-11-16'),
(7, 4, 'clienti', 'visualizza', TRUE, '2025-11-16'),
(8, 4, 'contratti', 'visualizza', TRUE, '2025-11-16'),
-- Permessi per Simona Ferrari (id: 6)
(9, 6, 'dashboard', 'visualizza', TRUE, '2025-11-16'),
(10, 6, 'valutazioni', 'visualizza', TRUE, '2025-11-16'),
(11, 6, 'clienti', 'visualizza', FALSE, '2025-11-16'),
(12, 6, 'contratti', 'visualizza', FALSE, '2025-11-16');

-- Reset delle sequenze IDENTITY per evitare conflitti di PK sui successivi INSERT
-- Nota: H2 supporta RESTART WITH solo su colonne IDENTITY/AUTO_INCREMENT
ALTER TABLE ruoli            ALTER COLUMN id RESTART WITH 3;
ALTER TABLE utenti           ALTER COLUMN id RESTART WITH 7;
ALTER TABLE citta            ALTER COLUMN id RESTART WITH 5;
ALTER TABLE stati_immobili   ALTER COLUMN id RESTART WITH 6;
ALTER TABLE immobili         ALTER COLUMN id RESTART WITH 6;
ALTER TABLE valutazioni      ALTER COLUMN id RESTART WITH 6;
ALTER TABLE stati_richieste  ALTER COLUMN id RESTART WITH 6;
ALTER TABLE richieste        ALTER COLUMN id RESTART WITH 5;
ALTER TABLE stati_contratti  ALTER COLUMN id RESTART WITH 6;
ALTER TABLE contratti        ALTER COLUMN id RESTART WITH 4;
ALTER TABLE permessi_agenti  ALTER COLUMN id RESTART WITH 13;