package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Contratto;
import com.keyabita.keyabita.model.StatoContratto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContrattoRepository extends JpaRepository<Contratto, Integer> {
    
    List<Contratto> findByStatoContratto(StatoContratto statoContratto);
    
    List<Contratto> findByStatoContrattoNome(String nomeStato);
    
    @Query("SELECT c FROM Contratto c WHERE c.inizioContratto >= :dataInizio")
    List<Contratto> findByDataInizioMaggioreUguale(@Param("dataInizio") LocalDate dataInizio);
    
    @Query("SELECT c FROM Contratto c WHERE c.fineContratto <= :dataFine")
    List<Contratto> findByDataFineMinoreUguale(@Param("dataFine") LocalDate dataFine);
    
    @Query("SELECT c FROM Contratto c WHERE c.inizioContratto BETWEEN :dataInizio AND :dataFine")
    List<Contratto> findByPeriodo(@Param("dataInizio") LocalDate dataInizio, @Param("dataFine") LocalDate dataFine);
}