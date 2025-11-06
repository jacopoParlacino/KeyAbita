package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.keyabita.keyabita.model.Contratto;

import com.keyabita.keyabita.repos.ContrattoRepository;

@Service
public class ContrattoServiceImpl implements ContrattoService{

    @Autowired
    private ContrattoRepository contrattoRepository;

    @Override
    public List<Contratto> trovaTuttiContratti(){

        return contrattoRepository.findAll();
        
    }

    @Override
    public Optional<Contratto> trovaContrattoConId(int id){

        return contrattoRepository.findById(id);
        
    }

}
