package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Metratura;
import com.keyabita.keyabita.repos.MetraturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetraturaServiceImpl implements IMetraturaService {
    
    @Autowired
    private MetraturaRepository metraturaRepository;
    
    @Override
    public List<Metratura> trovaTutteMetrature() {
        return metraturaRepository.findAll();
    }
    
    @Override
    public Metratura salvaMetratura(Metratura metratura) {
        return metraturaRepository.save(metratura);
    }
    
    @Override
    public void eliminaMetratura(int id) {
        metraturaRepository.deleteById(id);
    }
    
    @Override
    public Optional<Metratura> trovaMetraturaPerId(int id) {
        return metraturaRepository.findById(id);
    }
    
    @Override
    public Optional<Metratura> trovaMetraturaPerDescrizione(String descrizione) {
        return metraturaRepository.findByDescrizione(descrizione);
    }
}
