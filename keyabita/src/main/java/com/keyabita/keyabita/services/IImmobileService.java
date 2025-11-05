package com.keyabita.keyabita.services;

// Interfaccia che definisce i servizi disponibili per la gestione degli immobili.
// Permette di astrarre la logica di business dal controller.

import com.keyabita.keyabita.model.Citta;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.model.StatoImmobile;
import java.util.List;
import java.util.Optional;

public interface IImmobileService {
    // Restituisce tutti gli immobili
    List<Immobile> trovaTuttiImmobili();
    
    // Salva o aggiorna un immobile
    Immobile salvaImmobile(Immobile immobile);
    
    // Elimina un immobile per ID
    void eliminaImmobile(int id);
    
    // Restituisce un immobile per ID
    Optional<Immobile> trovaImmobilePerId(int id);
    
    // Trova immobili per città
    List<Immobile> trovaImmobiliPerCitta(Citta citta);
    
    // Trova immobili per stato immobile
    List<Immobile> trovaImmobiliPerStatoImmobile(StatoImmobile statoImmobile);
    
    // Trova immobili per numero di stanze
    List<Immobile> trovaImmobiliPerNumeroStanze(Integer numeroStanze);
}
