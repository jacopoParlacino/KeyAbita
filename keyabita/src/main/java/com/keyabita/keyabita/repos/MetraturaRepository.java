package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Metratura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MetraturaRepository extends JpaRepository<Metratura, Integer> {
    
    // Trova metratura per descrizione
    Optional<Metratura> findByDescrizione(String descrizione);
}
