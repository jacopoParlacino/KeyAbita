package com.keyabita.keyabita.services;

// Interfaccia che definisce i servizi disponibili per la gestione delle metrature.

import com.keyabita.keyabita.model.Metratura;
import java.util.List;
import java.util.Optional;

public interface IMetraturaService {
    // Restituisce tutte le metrature
    List<Metratura> trovaTutteMetrature();
    
    // Salva o aggiorna una metratura
    Metratura salvaMetratura(Metratura metratura);
    
    // Elimina una metratura per ID
    void eliminaMetratura(int id);
    
    // Restituisce una metratura per ID
    Optional<Metratura> trovaMetraturaPerId(int id);
    
    // Trova metratura per descrizione
    Optional<Metratura> trovaMetraturaPerDescrizione(String descrizione);
}
