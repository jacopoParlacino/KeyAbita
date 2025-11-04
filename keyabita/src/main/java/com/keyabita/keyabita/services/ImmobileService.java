package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.repos.ImmobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImmobileService {
    
    @Autowired
    private ImmobileRepository immobileRepository;
    
    // Salva o aggiorna un immobile
    public Immobile salvaImmobile(Immobile immobile) {
        return immobileRepository.save(immobile);
    }
    
    // Trova tutti gli immobili
    public List<Immobile> trovaTuttiImmobili() {
        return immobileRepository.findAll();
    }
    
    // Trova immobile per ID
    public Optional<Immobile> trovaImmobilePerId(int id) {
        return immobileRepository.findById(id);
    }
    
    // Elimina immobile per ID
    public void eliminaImmobile(int id) {
        immobileRepository.deleteById(id);
    }
    
    // Trova immobili per proprietario
    public List<Immobile> trovaImmobiliPerProprietario(int proprietarioId) {
        return immobileRepository.findByProprietarioId(proprietarioId);
    }
    
    // Trova immobili per città
    public List<Immobile> trovaImmobiliPerCitta(String citta) {
        return immobileRepository.findByCitta(citta);
    }
    
    // Trova immobili per stato pratica
    public List<Immobile> trovaImmobiliPerStatoPratica(String statoPratica) {
        return immobileRepository.findByStatoPratica(statoPratica);
    }
    
    // Trova immobili per stato immobile
    public List<Immobile> trovaImmobiliPerStatoImmobile(String statoImmobile) {
        return immobileRepository.findByStatoImmobile(statoImmobile);
    }
    
    // Trova immobili con prezzo massimo
    public List<Immobile> trovaImmobiliPerPrezzoMassimo(Double prezzoMax) {
        return immobileRepository.findByPrezzoRichiestoLessThanEqual(prezzoMax);
    }
    
    // Trova immobili per numero di stanze
    public List<Immobile> trovaImmobiliPerNumeroStanze(Integer numeroStanze) {
        return immobileRepository.findByNumeroStanze(numeroStanze);
    }
    
    // Trova immobili per città e stato pratica
    public List<Immobile> trovaImmobiliPerCittaEStatoPratica(String citta, String statoPratica) {
        return immobileRepository.findByCittaAndStatoPratica(citta, statoPratica);
    }
    
    // Aggiorna stato pratica
    public Immobile aggiornaStatoPratica(int id, String nuovoStato) {
        Optional<Immobile> immobileOpt = immobileRepository.findById(id);
        if (immobileOpt.isPresent()) {
            Immobile immobile = immobileOpt.get();
            immobile.setStatoPratica(nuovoStato);
            return immobileRepository.save(immobile);
        }
        return null;
    }
    
    // Aggiorna valutazione stimata
    public Immobile aggiornaValutazioneStimata(int id, Double valutazione) {
        Optional<Immobile> immobileOpt = immobileRepository.findById(id);
        if (immobileOpt.isPresent()) {
            Immobile immobile = immobileOpt.get();
            immobile.setValutazioneStimata(valutazione);
            immobile.setStatoPratica("valutato");
            return immobileRepository.save(immobile);
        }
        return null;
    }
}
