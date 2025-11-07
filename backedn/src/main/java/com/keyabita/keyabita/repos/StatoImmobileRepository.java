package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.StatoImmobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatoImmobileRepository extends JpaRepository<StatoImmobile, Integer> {
    
    // Trova stato per nome
    Optional<StatoImmobile> findByNome(String nome);
}
