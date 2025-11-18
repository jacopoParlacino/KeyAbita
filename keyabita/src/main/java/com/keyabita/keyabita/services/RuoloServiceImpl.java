package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyabita.keyabita.model.Ruolo;
import com.keyabita.keyabita.repos.RuoloRepo;

@Service
public class RuoloServiceImpl implements RuoloService {

    @Autowired
    private RuoloRepo ruoloRepo;

    @Override
    public List<Ruolo> getAllRuoli() {
        return ruoloRepo.findAll();
    }

    @Override
    public Ruolo getRuoloById(Integer id) {
        return ruoloRepo.findById(id).orElse(null);
    }

    @Override
    public Ruolo createRuolo(Ruolo ruolo) {
        return ruoloRepo.save(ruolo);
    }

    @Override
    public Ruolo updateRuolo(Integer id, Ruolo ruolo) {
        Optional<Ruolo> existing = ruoloRepo.findById(id);
        if (existing.isPresent()) {
            Ruolo aggiornato = existing.get();
            aggiornato.setNome(ruolo.getNome());
            return ruoloRepo.save(aggiornato);
        }
        return null;
    }

    @Override
    public void deleteRuolo(Integer id) {
        ruoloRepo.deleteById(id);
    }
}