package com.keyabita.keyabita.controller;

// Controller REST che gestisce le richieste HTTP per gli immobili.
// Espone endpoint per CRUD, ricerca e aggiornamento parziale degli immobili.

import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.service.ImmobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/immobili")
public class ImmobiliREST {
    @Autowired
    private ImmobileService immobileService; // Service per la logica di business

    // Restituisce tutti gli immobili
    @GetMapping
    public List<Immobile> getAll() {
        return immobileService.getAll();
    }

    // Restituisce un immobile per ID
    @GetMapping("/{id}")
    public ResponseEntity<Immobile> getById(@PathVariable int id) {
        return immobileService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Crea un nuovo immobile
    @PostMapping
    public ResponseEntity<Immobile> crea(@RequestBody Immobile immobile) {
        Immobile salvato = immobileService.salva(immobile);
        return ResponseEntity.ok(salvato);
    }

    // Aggiorna un immobile esistente
    @PutMapping("/{id}")
    public ResponseEntity<Immobile> aggiorna(@PathVariable int id, @RequestBody Immobile immobile) {
        if (!immobileService.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        immobile.setId(id);
        return ResponseEntity.ok(immobileService.salva(immobile));
    }

    // Elimina un immobile per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable int id) {
        boolean esiste = immobileService.elimina(id);
        return esiste ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Ricerca per tipo immobile
    @GetMapping("/tipo/{tipo}")
    public List<Immobile> getByTipo(@PathVariable String tipo) {
        return immobileService.getByTipo(tipo);
    }

    // Ricerca per città
    @GetMapping("/citta/{citta}")
    public List<Immobile> getByCitta(@PathVariable String citta) {
        return immobileService.getByCitta(citta);
    }

    // Ricerca per prezzo massimo
    @GetMapping("/prezzo/{maxPrezzo}")
    public List<Immobile> getByPrezzoMax(@PathVariable double maxPrezzo) {
        return immobileService.getByPrezzoLessThanEqual(maxPrezzo);
    }

    // Aggiorna parzialmente un immobile esistente (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Immobile> patchImmobile(@PathVariable int id, @RequestBody Immobile patch) {
        return immobileService.getById(id)
            .map(existing -> {
                if (patch.getTipo() != null) existing.setTipo(patch.getTipo());
                if (patch.getIndirizzo() != null) existing.setIndirizzo(patch.getIndirizzo());
                if (patch.getCitta() != null) existing.setCitta(patch.getCitta());
                if (patch.getPrezzo() != 0) existing.setPrezzo(patch.getPrezzo());
                if (patch.getMetriQuadri() != 0) existing.setMetriQuadri(patch.getMetriQuadri());
                if (patch.getNumeroStanze() != 0) existing.setNumeroStanze(patch.getNumeroStanze());
                if (patch.getDescrizione() != null) existing.setDescrizione(patch.getDescrizione());
                return ResponseEntity.ok(immobileService.salva(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}