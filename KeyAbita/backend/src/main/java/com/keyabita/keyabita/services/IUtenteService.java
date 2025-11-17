package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Utente;
import java.util.List;
import java.util.Optional;

public interface IUtenteService {
    
    List<Utente> getAllUtenti();
    
    Optional<Utente> getUtenteById(Integer id);
    
    Optional<Utente> getUtenteByEmail(String email);
    
    List<Utente> searchUtenti(String searchTerm);
    
    List<Utente> getUtentiByRuolo(String nomeRuolo);
    
    Utente saveUtente(Utente utente);
    
    void deleteUtente(Integer id);
    
    boolean existsByEmail(String email);
    
    // Metodi per admin
    boolean resetPassword(Integer utenteId, String newPassword);
    
    Utente updateUtente(Integer id, Utente utente);
    
    List<Utente> getAllAgenti();
}