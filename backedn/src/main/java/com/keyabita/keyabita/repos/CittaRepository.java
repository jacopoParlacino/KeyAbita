package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Citta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CittaRepository extends JpaRepository<Citta, Integer> {
    
    // Trova città per nome
    Optional<Citta> findByNome(String nome);
}
