package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Citta;
import com.keyabita.keyabita.repos.CittaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CittaServiceImpl implements ICittaService {
    
    @Autowired
    private CittaRepository cittaRepository;
    
    @Override
    public List<Citta> trovaTutteCitta() {
        return cittaRepository.findAll();
    }
    
    @Override
    public Citta salvaCitta(Citta citta) {
        return cittaRepository.save(citta);
    }
    
    @Override
    public void eliminaCitta(int id) {
        cittaRepository.deleteById(id);
    }
    
    @Override
    public Optional<Citta> trovaCittaPerId(int id) {
        return cittaRepository.findById(id);
    }
    
    @Override
    public Optional<Citta> trovaCittaPerNome(String nome) {
        return cittaRepository.findByNome(nome);
    }
}
