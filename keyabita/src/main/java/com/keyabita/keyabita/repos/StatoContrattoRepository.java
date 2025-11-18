package com.keyabita.keyabita.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.StatoContratto;

import java.util.List;
import java.util.Optional;


@Repository
public interface StatoContrattoRepository extends JpaRepository<StatoContratto,Integer> {

    Optional<StatoContratto> findById(Integer id);

    List<StatoContratto> findAll();

    long count();

}
