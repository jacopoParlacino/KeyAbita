package com.keyabita.keyabita.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keyabita.keyabita.model.Richiesta;

import java.util.List;
import java.util.Optional;


@Repository
public interface RichiestaRepo extends JpaRepository<Richiesta, Integer> {

    Optional<Richiesta> findById(Integer id);

    List<Richiesta> findAll();

    long count();

    // Query methods personalizzati basati sullo schema
    List<Richiesta> findByEmail(String email);

    List<Richiesta> findByStatoRichiesta_Id(Integer statoRichiestaId);

    List<Richiesta> findByImmobile_Id(Integer immobileId);

    List <Richiesta> findByNumero(String Numero);

}
