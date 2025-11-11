package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyabita.keyabita.model.StatoRichiesta;
import com.keyabita.keyabita.repos.StatoRichiestaRepository;

@Service
public class StatoRichiestaServiceImpl implements StatoRichiestaService{

    @Autowired
    StatoRichiestaRepository statoRichiestaRepo;

    @Override
    public Optional<StatoRichiesta> trovaStatoRichiestaConId(int id){

        return statoRichiestaRepo.findById(id);

    }

    @Override
    public List<StatoRichiesta> trovaTuttiStatiRichiesta(){

        return statoRichiestaRepo.findAll();

    }

    @Override
    public long numeroStatiRichiesta(){

        return statoRichiestaRepo.count();

    }

}
