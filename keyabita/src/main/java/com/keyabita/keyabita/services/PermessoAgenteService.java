package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.PermessoAgente;
import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.repos.PermessoAgenteRepository;
import com.keyabita.keyabita.repos.UtenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermessoAgenteService {

    @Autowired
    private PermessoAgenteRepository permessoRepository;

    @Autowired
    private UtenteRepo utenteRepository;

    public List<PermessoAgente> getPermessiByAgente(Integer utenteId) {
        return permessoRepository.findByUtenteId(utenteId);
    }

    public Optional<PermessoAgente> getPermessoByAgenteAndModulo(Integer utenteId, String modulo) {
        Optional<Utente> utente = utenteRepository.findById(utenteId);
        if (utente.isPresent()) {
            return permessoRepository.findByUtenteAndModulo(utente.get(), modulo);
        }
        return Optional.empty();
    }

    public PermessoAgente createPermesso(Integer utenteId, String modulo) {
        Optional<Utente> utente = utenteRepository.findById(utenteId);
        if (utente.isPresent()) {
            Optional<PermessoAgente> existing = permessoRepository.findByUtenteAndModulo(utente.get(), modulo);
            if (existing.isEmpty()) {
                PermessoAgente permesso = new PermessoAgente(utente.get(), modulo);
                return permessoRepository.save(permesso);
            }
            return existing.get();
        }
        return null;
    }

    public void initializePermessiForAgente(Integer utenteId) {
        Optional<Utente> utente = utenteRepository.findById(utenteId);
        if (utente.isPresent()) {
            String[] moduli = {"clienti", "contratti", "valutazioni", "immobili", "richieste"};
            for (String modulo : moduli) {
                Optional<PermessoAgente> existing = permessoRepository.findByUtenteAndModulo(utente.get(), modulo);
                if (existing.isEmpty()) {
                    PermessoAgente permesso = new PermessoAgente(utente.get(), modulo);
                    permesso.setVisualizza(true);
                    permessoRepository.save(permesso);
                }
            }
        }
    }

    public PermessoAgente updatePermesso(Integer utenteId, String modulo, PermessoAgente permessoUpdate) {
        Optional<PermessoAgente> existing = getPermessoByAgenteAndModulo(utenteId, modulo);
        if (existing.isPresent()) {
            PermessoAgente permesso = existing.get();
            if (permessoUpdate.getVisualizza() != null) {
                permesso.setVisualizza(permessoUpdate.getVisualizza());
            }
            if (permessoUpdate.getCreare() != null) {
                permesso.setCreare(permessoUpdate.getCreare());
            }
            if (permessoUpdate.getModificare() != null) {
                permesso.setModificare(permessoUpdate.getModificare());
            }
            if (permessoUpdate.getEliminare() != null) {
                permesso.setEliminare(permessoUpdate.getEliminare());
            }
            return permessoRepository.save(permesso);
        }
        return null;
    }

    public void deletePermessiByAgente(Integer utenteId) {
        List<PermessoAgente> permessi = getPermessiByAgente(utenteId);
        permessoRepository.deleteAll(permessi);
    }
}
