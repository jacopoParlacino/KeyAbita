package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Contratto;
import com.keyabita.keyabita.model.StatoContratto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IContrattoService {
    
    List<Contratto> getAllContratti();
    
    Optional<Contratto> getContrattoById(Integer id);
    
    List<Contratto> getContrattiByStato(String nomeStato);
    
    List<Contratto> getContrattiByPeriodo(LocalDate dataInizio, LocalDate dataFine);
    
    List<Contratto> getContrattiAttivi();
    
    List<Contratto> getContrattiInScadenza(int giorni);
    
    Contratto saveContratto(Contratto contratto);
    
    void deleteContratto(Integer id);
    
    List<StatoContratto> getAllStatiContratto();
}