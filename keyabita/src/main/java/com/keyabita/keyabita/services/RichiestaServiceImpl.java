package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyabita.keyabita.model.Richiesta;
import com.keyabita.keyabita.repos.RichiestaRepo;

@Service
public class RichiestaServiceImpl implements RichiestaService {

    @Autowired
    private RichiestaRepo richiestaRepo;

    @Override
    public List<Richiesta> trovaTutteRichieste() {
        return richiestaRepo.findAll();
    }

    @Override
    public Optional<Richiesta> trovaRichiestaConId(int id) {
        return richiestaRepo.findById(id);
    }

    @Override
    public List<Richiesta> trovaRichiesteConStato(int id) {
        return richiestaRepo.findByStatoRichiesta_Id(id);
    }

    @Override
    public Optional<Richiesta> trovaRichiestaConImmobile(int immobileId) {
        List<Richiesta> richieste = richiestaRepo.findByImmobile_Id(immobileId);
        return richieste.isEmpty() ? Optional.empty() : Optional.of(richieste.get(0));
    }

    @Override
    public List<Richiesta> trovaRichiesteConEmail(String email){

        return richiestaRepo.findByEmail(email);

    }

    @Override
    public List<Richiesta> trovaRichiesteConNumero(String numero){

        return richiestaRepo.findByNumero(numero);

    }

    @Override
    public Richiesta salvaRichiesta(Richiesta richiesta) {
        return richiestaRepo.save(richiesta);
    }

}
