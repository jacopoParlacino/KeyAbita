package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Valutazione;
import com.keyabita.keyabita.model.Immobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ValutazioneRepository extends JpaRepository<Valutazione, Integer> {
    List<Valutazione> findByImmobile(Immobile immobile);
    List<Valutazione> findByValoreStimatoBetween(Integer min, Integer max);
}