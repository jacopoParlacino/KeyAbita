package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.StatoRichiesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatoRichiestaRepository extends JpaRepository<StatoRichiesta, Integer> {
    
    Optional<StatoRichiesta> findByNome(String nome);
}