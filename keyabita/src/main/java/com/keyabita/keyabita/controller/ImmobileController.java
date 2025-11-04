package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.services.ImmobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/immobili")
@CrossOrigin(origins = "*") // Permette richieste da qualsiasi origine
public class ImmobileController {
    
    @Autowired
    private ImmobileService immobileService;
    
    // GET: Ottieni tutti gli immobili
    @GetMapping
    public ResponseEntity<List<Immobile>> getTuttiImmobili() {
        List<Immobile> immobili = immobileService.trovaTuttiImmobili();
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Ottieni immobile per ID
    @GetMapping("/{id}")
    public ResponseEntity<Immobile> getImmobilePerId(@PathVariable int id) {
        Optional<Immobile> immobile = immobileService.trovaImmobilePerId(id);
        return immobile.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST: Crea nuovo immobile
    @PostMapping
    public ResponseEntity<Immobile> creaImmobile(@RequestBody Immobile immobile) {
        Immobile nuovoImmobile = immobileService.salvaImmobile(immobile);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoImmobile);
    }
    
    // PUT: Aggiorna immobile esistente
    @PutMapping("/{id}")
    public ResponseEntity<Immobile> aggiornaImmobile(@PathVariable int id, @RequestBody Immobile immobile) {
        Optional<Immobile> immobileEsistente = immobileService.trovaImmobilePerId(id);
        if (immobileEsistente.isPresent()) {
            immobile.setId(id);
            Immobile immobileAggiornato = immobileService.salvaImmobile(immobile);
            return ResponseEntity.ok(immobileAggiornato);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE: Elimina immobile
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaImmobile(@PathVariable int id) {
        Optional<Immobile> immobile = immobileService.trovaImmobilePerId(id);
        if (immobile.isPresent()) {
            immobileService.eliminaImmobile(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // GET: Trova immobili per proprietario
    @GetMapping("/proprietario/{proprietarioId}")
    public ResponseEntity<List<Immobile>> getImmobiliPerProprietario(@PathVariable int proprietarioId) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerProprietario(proprietarioId);
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Trova immobili per città
    @GetMapping("/citta/{citta}")
    public ResponseEntity<List<Immobile>> getImmobiliPerCitta(@PathVariable String citta) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerCitta(citta);
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Trova immobili per stato pratica
    @GetMapping("/stato-pratica/{statoPratica}")
    public ResponseEntity<List<Immobile>> getImmobiliPerStatoPratica(@PathVariable String statoPratica) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerStatoPratica(statoPratica);
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Trova immobili per stato immobile
    @GetMapping("/stato-immobile/{statoImmobile}")
    public ResponseEntity<List<Immobile>> getImmobiliPerStatoImmobile(@PathVariable String statoImmobile) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerStatoImmobile(statoImmobile);
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Trova immobili per prezzo massimo
    @GetMapping("/prezzo-max/{prezzoMax}")
    public ResponseEntity<List<Immobile>> getImmobiliPerPrezzoMassimo(@PathVariable Double prezzoMax) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerPrezzoMassimo(prezzoMax);
        return ResponseEntity.ok(immobili);
    }
    
    // GET: Trova immobili per numero di stanze
    @GetMapping("/stanze/{numeroStanze}")
    public ResponseEntity<List<Immobile>> getImmobiliPerNumeroStanze(@PathVariable Integer numeroStanze) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerNumeroStanze(numeroStanze);
        return ResponseEntity.ok(immobili);
    }
    
    // PATCH: Aggiorna stato pratica
    @PatchMapping("/{id}/stato-pratica")
    public ResponseEntity<Immobile> aggiornaStatoPratica(@PathVariable int id, @RequestParam String statoPratica) {
        Immobile immobileAggiornato = immobileService.aggiornaStatoPratica(id, statoPratica);
        if (immobileAggiornato != null) {
            return ResponseEntity.ok(immobileAggiornato);
        }
        return ResponseEntity.notFound().build();
    }
    
    // PATCH: Aggiorna valutazione stimata
    @PatchMapping("/{id}/valutazione")
    public ResponseEntity<Immobile> aggiornaValutazione(@PathVariable int id, @RequestParam Double valutazione) {
        Immobile immobileAggiornato = immobileService.aggiornaValutazioneStimata(id, valutazione);
        if (immobileAggiornato != null) {
            return ResponseEntity.ok(immobileAggiornato);
        }
        return ResponseEntity.notFound().build();
    }
}
