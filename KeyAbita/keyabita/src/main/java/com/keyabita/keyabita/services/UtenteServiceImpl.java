package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.repos.UtenteRepo;

@Service
public class UtenteServiceImpl implements UtenteService {

    @Autowired
    private UtenteRepo utenteRepo;

    @Override
    public List<Utente> getAllUtenti() {
        return utenteRepo.findAll();
    }

    @Override
    public Utente getUtenteById(Integer id) {
        return utenteRepo.findById(id).orElse(null);
    }

    @Override
    public Utente getUtenteByEmail(String email) {
        return utenteRepo.findByEmail(email).orElse(null);
    }

    @Override
    public Utente createUtente(Utente utente) {
        return utenteRepo.save(utente);
    }

    @Override
    public Utente updateUtente(Integer id, Utente utente) {
        Optional<Utente> existing = utenteRepo.findById(id);
        if (existing.isPresent()) {
            Utente aggiornato = existing.get();
            aggiornato.setNome(utente.getNome());
            aggiornato.setCognome(utente.getCognome());
            aggiornato.setEmail(utente.getEmail());
            aggiornato.setRuolo(utente.getRuolo());
            aggiornato.setTelefono(utente.getTelefono());
            aggiornato.setDataCreazione(utente.getDataCreazione());
            if (utente.getPassword() != null && !utente.getPassword().isEmpty()) {
                aggiornato.setPassword(utente.getPassword());
            }
            return utenteRepo.save(aggiornato);
        }
        return null;
    }

    @Override
    public void deleteUtente(Integer id) {
        utenteRepo.deleteById(id);
    }
}