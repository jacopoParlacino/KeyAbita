package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.StatoContratto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatoContrattoRepository extends JpaRepository<StatoContratto, Integer> {
    
    Optional<StatoContratto> findByNome(String nome);
}