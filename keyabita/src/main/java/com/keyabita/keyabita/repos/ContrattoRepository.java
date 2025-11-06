package com.keyabita.keyabita.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.Contratto;
import java.util.List;
import java.util.Optional;


@Repository
public interface ContrattoRepository extends JpaRepository<Contratto,Integer> {

    Optional<Contratto> findById(Integer id);

    List<Contratto> findAll();

    long count();

}
