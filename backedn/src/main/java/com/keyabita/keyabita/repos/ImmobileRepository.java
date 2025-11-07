package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Citta;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.model.StatoImmobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImmobileRepository extends JpaRepository<Immobile, Integer> {
    
    // Trova immobili per città
    List<Immobile> findByCitta(Citta citta);
    
    // Trova immobili per stato immobile
    List<Immobile> findByStatoImmobile(StatoImmobile statoImmobile);
    
    // Trova immobili con numero di stanze specificato
    List<Immobile> findByNumeroStanze(Integer numeroStanze);
}
