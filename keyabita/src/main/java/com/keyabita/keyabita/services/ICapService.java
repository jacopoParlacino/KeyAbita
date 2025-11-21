package com.keyabita.keyabita.services;

// Interfaccia che definisce i servizi disponibili per la gestione dei CAP.

import com.keyabita.keyabita.model.Cap;
import java.util.List;
import java.util.Optional;

public interface ICapService {
    // Restituisce tutti i CAP
    List<Cap> trovaTuttiCap();
    
    // Salva o aggiorna un CAP
    Cap salvaCap(Cap cap);
    
    // Elimina un CAP per id (che è il CAP stesso)
    void eliminaCap(String cap);
    
    // Restituisce un CAP per id
    Optional<Cap> trovaCapPerId(String cap);
    
    // Trova CAP per nome città
    Optional<Cap> trovaCapPerNomeCitta(String nomeCitta);
}
