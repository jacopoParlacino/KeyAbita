package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Integer> {
    
    Optional<Utente> findByEmail(String email);
    
    List<Utente> findByNomeContainingIgnoreCaseOrCognomeContainingIgnoreCase(String nome, String cognome);
    
    @Query("SELECT u FROM Utente u WHERE u.ruolo.nome = :nomeRuolo")
    List<Utente> findByRuolo(@Param("nomeRuolo") String nomeRuolo);
    
    @Query("SELECT u FROM Utente u ORDER BY u.dataCreazione DESC")
    List<Utente> findAllOrderByDataCreazione();
}