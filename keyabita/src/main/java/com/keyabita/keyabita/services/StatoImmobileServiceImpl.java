package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.StatoImmobile;
import com.keyabita.keyabita.repos.StatoImmobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatoImmobileServiceImpl implements IStatoImmobileService {
    
    @Autowired
    private StatoImmobileRepository statoImmobileRepository;
    
    @Override
    public List<StatoImmobile> trovaTuttiStatiImmobile() {
        return statoImmobileRepository.findAll();
    }
    
    @Override
    public StatoImmobile salvaStatoImmobile(StatoImmobile statoImmobile) {
        return statoImmobileRepository.save(statoImmobile);
    }
    
    @Override
    public void eliminaStatoImmobile(int id) {
        statoImmobileRepository.deleteById(id);
    }
    
    @Override
    public Optional<StatoImmobile> trovaStatoImmobilePerId(int id) {
        return statoImmobileRepository.findById(id);
    }
    
    @Override
    public Optional<StatoImmobile> trovaStatoImmobilePerNome(String nome) {
        return statoImmobileRepository.findByNome(nome);
    }
}
