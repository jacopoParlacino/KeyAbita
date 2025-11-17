package com.keyabita.keyabita.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.Utente;

import java.util.Optional;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Integer> {
    Optional<Utente> findByEmail(String email);
}