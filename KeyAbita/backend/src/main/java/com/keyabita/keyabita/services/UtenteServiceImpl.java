package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.repos.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UtenteServiceImpl implements IUtenteService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Override
    public List<Utente> getAllUtenti() {
        return utenteRepository.findAllOrderByDataCreazione();
    }

    @Override
    public Optional<Utente> getUtenteById(Integer id) {
        return utenteRepository.findById(id);
    }

    @Override
    public Optional<Utente> getUtenteByEmail(String email) {
        return utenteRepository.findByEmail(email);
    }

    @Override
    public List<Utente> searchUtenti(String searchTerm) {
        return utenteRepository.findByNomeContainingIgnoreCaseOrCognomeContainingIgnoreCase(searchTerm, searchTerm);
    }

    @Override
    public List<Utente> getUtentiByRuolo(String nomeRuolo) {
        return utenteRepository.findByRuolo(nomeRuolo);
    }

    @Override
    public Utente saveUtente(Utente utente) {
        if (utente.getDataCreazione() == null) {
            utente.setDataCreazione(LocalDate.now());
        }
        return utenteRepository.save(utente);
    }

    @Override
    public void deleteUtente(Integer id) {
        utenteRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return utenteRepository.findByEmail(email).isPresent();
    }

    @Override
    public boolean resetPassword(Integer utenteId, String newPassword) {
        try {
            Optional<Utente> utenteOpt = utenteRepository.findById(utenteId);
            if (utenteOpt.isPresent()) {
                Utente utente = utenteOpt.get();
                utente.setPassword(newPassword); // In produzione utilizzare hashing
                utenteRepository.save(utente);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Utente updateUtente(Integer id, Utente utente) {
        if (getUtenteById(id).isPresent()) {
            utente.setId(id);
            return utenteRepository.save(utente);
        }
        return null;
    }

    @Override
    public List<Utente> getAllAgenti() {
        return getUtentiByRuolo("Agenti");
    }
}