package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Cap;
import com.keyabita.keyabita.repos.CapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CapServiceImpl implements ICapService {
    
    @Autowired
    private CapRepository capRepository;
    
    @Override
    public List<Cap> trovaTuttiCap() {
        return capRepository.findAll();
    }
    
    @Override
    public Cap salvaCap(Cap cap) {
        return capRepository.save(cap);
    }
    
    @Override
    public void eliminaCap(String cap) {
        capRepository.deleteById(cap);
    }
    
    @Override
    public Optional<Cap> trovaCapPerId(String cap) {
        return capRepository.findById(cap);
    }
    
    @Override
    public Optional<Cap> trovaCapPerNomeCitta(String nomeCitta) {
        return capRepository.findByNomeCitta(nomeCitta);
    }
}
