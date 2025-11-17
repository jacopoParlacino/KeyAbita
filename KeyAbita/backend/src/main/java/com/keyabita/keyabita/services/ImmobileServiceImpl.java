package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Citta;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.model.StatoImmobile;
import com.keyabita.keyabita.repos.ImmobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImmobileServiceImpl implements IImmobileService {
    
    @Autowired
    private ImmobileRepository immobileRepository;
    
    @Override
    public Immobile salvaImmobile(Immobile immobile) {
        return immobileRepository.save(immobile);
    }
    
    @Override
    public List<Immobile> trovaTuttiImmobili() {
        return immobileRepository.findAll();
    }
    
    @Override
    public Optional<Immobile> trovaImmobilePerId(int id) {
        return immobileRepository.findById(id);
    }
    
    @Override
    public void eliminaImmobile(int id) {
        immobileRepository.deleteById(id);
    }
    
    @Override
    public List<Immobile> trovaImmobiliPerCitta(Citta citta) {
        return immobileRepository.findByCitta(citta);
    }
    
    @Override
    public List<Immobile> trovaImmobiliPerStatoImmobile(StatoImmobile statoImmobile) {
        return immobileRepository.findByStatoImmobile(statoImmobile);
    }
    
    @Override
    public List<Immobile> trovaImmobiliPerNumeroStanze(Integer numeroStanze) {
        return immobileRepository.findByNumeroStanze(numeroStanze);
    }
}
