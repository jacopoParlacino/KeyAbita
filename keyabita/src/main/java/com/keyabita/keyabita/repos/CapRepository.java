package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Cap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CapRepository extends JpaRepository<Cap, String> {
    
    // Trova cap per nome città
    Optional<Cap> findByNomeCitta(String nomeCitta);
}
