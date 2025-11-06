package com.keyabita.keyabita.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.Ruolo;

@Repository
public interface RuoloRepo extends JpaRepository<Ruolo, Integer> {
}