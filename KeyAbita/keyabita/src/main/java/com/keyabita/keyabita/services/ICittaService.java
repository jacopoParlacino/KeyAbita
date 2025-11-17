package com.keyabita.keyabita.services;

// Interfaccia che definisce i servizi disponibili per la gestione delle città.

import com.keyabita.keyabita.model.Citta;
import java.util.List;
import java.util.Optional;

public interface ICittaService {
    // Restituisce tutte le città
    List<Citta> trovaTutteCitta();
    
    // Salva o aggiorna una città
    Citta salvaCitta(Citta citta);
    
    // Elimina una città per ID
    void eliminaCitta(int id);
    
    // Restituisce una città per ID
    Optional<Citta> trovaCittaPerId(int id);
    
    // Trova città per nome
    Optional<Citta> trovaCittaPerNome(String nome);
}
