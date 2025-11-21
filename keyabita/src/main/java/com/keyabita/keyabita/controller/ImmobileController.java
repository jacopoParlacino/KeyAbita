package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Cap;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.model.StatoImmobile;
import com.keyabita.keyabita.services.ICapService;
import com.keyabita.keyabita.services.IImmobileService;
import com.keyabita.keyabita.services.IStatoImmobileService;
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
    private IImmobileService immobileService;
    
    @Autowired
    private ICapService capService;
    
    @Autowired
    private IStatoImmobileService statoImmobileService;
    
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
    
    // GET: Trova immobili per cap
    @GetMapping("/cap/{cap}")
    public ResponseEntity<List<Immobile>> getImmobiliPerCap(@PathVariable String cap) {
        Optional<Cap> capOpt = capService.trovaCapPerId(cap);
        if (capOpt.isPresent()) {
            List<Immobile> immobili = immobileService.trovaImmobiliPerCap(capOpt.get());
            return ResponseEntity.ok(immobili);
        }
        return ResponseEntity.ok(List.of()); // Restituisce lista vuota se cap non trovato
    }
    
    // GET: Trova immobili per stato immobile
    @GetMapping("/stato-immobile/{nomeStato}")
    public ResponseEntity<List<Immobile>> getImmobiliPerStatoImmobile(@PathVariable String nomeStato) {
        Optional<StatoImmobile> statoOpt = statoImmobileService.trovaStatoImmobilePerNome(nomeStato);
        if (statoOpt.isPresent()) {
            List<Immobile> immobili = immobileService.trovaImmobiliPerStatoImmobile(statoOpt.get());
            return ResponseEntity.ok(immobili);
        }
        return ResponseEntity.ok(List.of()); // Restituisce lista vuota se stato non trovato
    }
    
    // GET: Trova immobili per numero di stanze
    @GetMapping("/stanze/{numeroStanze}")
    public ResponseEntity<List<Immobile>> getImmobiliPerNumeroStanze(@PathVariable Integer numeroStanze) {
        List<Immobile> immobili = immobileService.trovaImmobiliPerNumeroStanze(numeroStanze);
        return ResponseEntity.ok(immobili);
    }
}
