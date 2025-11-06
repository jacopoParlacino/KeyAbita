package com.keyabita.keyabita.service;

import java.util.List;
import com.keyabita.keyabita.model.Utente;

public interface UtenteService {
    List<Utente> getAllUtenti();
    Utente getUtenteById(Integer id);
    Utente getUtenteByEmail(String email);
    Utente createUtente(Utente utente);
    Utente updateUtente(Integer id, Utente utente);
    void deleteUtente(Integer id);
}