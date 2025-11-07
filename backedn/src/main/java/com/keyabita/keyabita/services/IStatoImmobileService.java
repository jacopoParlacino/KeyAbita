package com.keyabita.keyabita.services;

// Interfaccia che definisce i servizi disponibili per la gestione degli stati immobile.

import com.keyabita.keyabita.model.StatoImmobile;
import java.util.List;
import java.util.Optional;

public interface IStatoImmobileService {
    // Restituisce tutti gli stati immobile
    List<StatoImmobile> trovaTuttiStatiImmobile();
    
    // Salva o aggiorna uno stato immobile
    StatoImmobile salvaStatoImmobile(StatoImmobile statoImmobile);
    
    // Elimina uno stato immobile per ID
    void eliminaStatoImmobile(int id);
    
    // Restituisce uno stato immobile per ID
    Optional<StatoImmobile> trovaStatoImmobilePerId(int id);
    
    // Trova stato immobile per nome
    Optional<StatoImmobile> trovaStatoImmobilePerNome(String nome);
}
