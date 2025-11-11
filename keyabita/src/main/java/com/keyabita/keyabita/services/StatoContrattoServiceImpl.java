package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyabita.keyabita.model.StatoContratto;
import com.keyabita.keyabita.repos.StatoContrattoRepository;

@Service
public class StatoContrattoServiceImpl implements StatoContrattoService {

    @Autowired
    StatoContrattoRepository statoContrattoRepo;

    @Override
    public List<StatoContratto> trovaTuttiStatoContratto(){
        return statoContrattoRepo.findAll();
    }

    @Override
    public Optional<StatoContratto> trovaTuttiStatoContrattoConId(int id){
        return statoContrattoRepo.findById(id);
    }

    

}
