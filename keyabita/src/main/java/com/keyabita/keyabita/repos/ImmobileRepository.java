package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.Immobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImmobileRepository extends JpaRepository<Immobile, Integer> {
    
    // Trova immobili per proprietario
    List<Immobile> findByProprietarioId(int proprietarioId);
    
    // Trova immobili per città
    List<Immobile> findByCitta(String citta);
    
    // Trova immobili per stato pratica
    List<Immobile> findByStatoPratica(String statoPratica);
    
    // Trova immobili per stato immobile
    List<Immobile> findByStatoImmobile(String statoImmobile);
    
    // Trova immobili con prezzo richiesto minore o uguale a un valore
    List<Immobile> findByPrezzoRichiestoLessThanEqual(Double prezzoMax);
    
    // Trova immobili con numero di stanze specificato
    List<Immobile> findByNumeroStanze(Integer numeroStanze);
    
    // Trova immobili per città e stato pratica
    List<Immobile> findByCittaAndStatoPratica(String citta, String statoPratica);
}
