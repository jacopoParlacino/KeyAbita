package com.keyabita.keyabita.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.StatoRichiesta;

import java.util.List;
import java.util.Optional;


@Repository
public interface StatoRichiestaRepository extends JpaRepository<StatoRichiesta,Integer> {

    Optional<StatoRichiesta> findById(Integer id);

    List<StatoRichiesta> findAll();

    long count();

}
