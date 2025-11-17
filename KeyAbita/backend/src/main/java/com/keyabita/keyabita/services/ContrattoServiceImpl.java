package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Contratto;
import com.keyabita.keyabita.model.StatoContratto;
import com.keyabita.keyabita.repos.ContrattoRepository;
import com.keyabita.keyabita.repos.StatoContrattoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ContrattoServiceImpl implements IContrattoService {
    
    @Autowired
    private ContrattoRepository contrattoRepository;
    
    @Autowired
    private StatoContrattoRepository statoContrattoRepository;

    @Override
    public List<Contratto> getAllContratti() {
        return contrattoRepository.findAll();
    }

    @Override
    public Optional<Contratto> getContrattoById(Integer id) {
        return contrattoRepository.findById(id);
    }

    @Override
    public List<Contratto> getContrattiByStato(String nomeStato) {
        return contrattoRepository.findByStatoContrattoNome(nomeStato);
    }

    @Override
    public List<Contratto> getContrattiByPeriodo(LocalDate dataInizio, LocalDate dataFine) {
        return contrattoRepository.findByPeriodo(dataInizio, dataFine);
    }

    @Override
    public List<Contratto> getContrattiAttivi() {
        return contrattoRepository.findByStatoContrattoNome("attivo");
    }

    @Override
    public List<Contratto> getContrattiInScadenza(int giorni) {
        LocalDate dataScadenza = LocalDate.now().plusDays(giorni);
        return contrattoRepository.findByDataFineMinoreUguale(dataScadenza);
    }

    @Override
    public Contratto saveContratto(Contratto contratto) {
        return contrattoRepository.save(contratto);
    }

    @Override
    public void deleteContratto(Integer id) {
        contrattoRepository.deleteById(id);
    }

    @Override
    public List<StatoContratto> getAllStatiContratto() {
        return statoContrattoRepository.findAll();
    }
}