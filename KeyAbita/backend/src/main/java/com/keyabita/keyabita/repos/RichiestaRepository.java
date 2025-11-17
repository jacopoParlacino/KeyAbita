package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Richiesta;
import com.keyabita.keyabita.model.StatoRichiesta;
import com.keyabita.keyabita.model.Immobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RichiestaRepository extends JpaRepository<Richiesta, Integer> {
    
    List<Richiesta> findByStatoRichiesta(StatoRichiesta statoRichiesta);
    
    List<Richiesta> findByStatoRichiestaNome(String nomeStato);
    
    List<Richiesta> findByImmobile(Immobile immobile);
    
    List<Richiesta> findByEmail(String email);
}