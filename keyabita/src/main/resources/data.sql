INSERT INTO users (id, nome, email, password_hash, ruolo, data_creazione) VALUES
(1, 'Mario Rossi', 'mario.rossi@immobiliaris.it', 'hash_mario', 'OWNER', '2025-10-23 07:20:53'),
(2, 'Laura Bianchi', 'laura.bianchi@immobiliaris.it', 'hash_laura', 'OWNER', '2025-10-23 07:20:53'),
(3, 'Paolo Ghirlinzoni', 'paolo.ghirlinzoni@immobiliaris.it', 'hash_paolo', 'ADMIN', '2025-10-23 07:20:53');

INSERT INTO properties (id, owner_id, titolo, citta, metri_quadri, prezzo_richiesto, valutazione_stimata, stato_pratica, data_creazione) VALUES
(1, 1, 'Appartamento moderno in centro', 'Torino', 95.00, 210000.00, NULL, 'in_attesa', '2025-10-23 07:20:53'),
(2, 1, 'Bilocale vicino al Politecnico', 'Torino', 55.00, 145000.00, NULL, 'in_attesa', '2025-10-23 07:20:53'),
(3, 2, 'Villetta con giardino', 'Cuneo', 120.00, 320000.00, NULL, 'in_attesa', '2025-10-23 07:20:53');

INSERT INTO valuations (id, property_id, valore_stimato, data_valutazione) VALUES
(1, 1, 215000.00, '2025-10-23 07:20:53'),
(2, 1, 218000.00, '2025-10-23 07:20:53'),
(3, 2, 150000.00, '2025-10-23 07:20:53'),
(4, 3, 310000.00, '2025-10-23 07:20:53');