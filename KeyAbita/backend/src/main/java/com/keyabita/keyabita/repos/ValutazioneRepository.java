package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Valutazione;
import com.keyabita.keyabita.model.Immobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ValutazioneRepository extends JpaRepository<Valutazione, Integer> {
    List<Valutazione> findByImmobile(Immobile immobile);
    List<Valutazione> findByValoreStimatoBetween(Integer min, Integer max);
    
    @Query("SELECT v FROM Valutazione v WHERE v.immobile.citta.nome = :nomeCitta")
    List<Valutazione> findByImmobileCittaNome(@Param("nomeCitta") String nomeCitta);
    
    @Query("SELECT v FROM Valutazione v ORDER BY v.dataCreazione DESC LIMIT :numero")
    List<Valutazione> findTopByOrderByDataCreazioneDesc(@Param("numero") int numero);
}