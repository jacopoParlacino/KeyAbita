package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Valutazione;
import com.keyabita.keyabita.services.IValutazioneService;
import com.keyabita.keyabita.services.IImmobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/valutazioni")
@CrossOrigin(origins = "*")
public class ValutazioneController {

    @Autowired
    private IValutazioneService valutazioneService;

    @Autowired
    private IImmobileService immobileService;

    @GetMapping
    public List<Valutazione> getAllValutazioni() {
        return valutazioneService.getAllValutazioni();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Valutazione> getValutazioneById(@PathVariable Integer id) {
        return valutazioneService.getValutazioneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/immobile/{immobileId}")
    public ResponseEntity<List<Valutazione>> getValutazioniByImmobile(@PathVariable Integer immobileId) {
        return immobileService.trovaImmobilePerId(immobileId)
                .map(immobile -> ResponseEntity.ok(valutazioneService.getValutazioniByImmobile(immobile)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/range")
    public List<Valutazione> getValutazioniByRange(
            @RequestParam Integer min,
            @RequestParam Integer max) {
        return valutazioneService.getValutazioniByRange(min, max);
    }

    @PostMapping
    public ResponseEntity<Valutazione> createValutazione(@RequestBody Valutazione valutazione) {
        Valutazione savedValutazione = valutazioneService.saveValutazione(valutazione);
        return ResponseEntity.ok(savedValutazione);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Valutazione> updateValutazione(@PathVariable Integer id, @RequestBody Valutazione valutazione) {
        return valutazioneService.getValutazioneById(id)
                .map(existingValutazione -> {
                    valutazione.setId(id);
                    return ResponseEntity.ok(valutazioneService.saveValutazione(valutazione));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteValutazione(@PathVariable Integer id) {
        return valutazioneService.getValutazioneById(id)
                .map(valutazione -> {
                    valutazioneService.deleteValutazione(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/citta/{nomeCitta}")
    public List<Valutazione> getValutazioniByCity(@PathVariable String nomeCitta) {
        return valutazioneService.getValutazioniByCity(nomeCitta);
    }

    @GetMapping("/recenti/{numero}")
    public List<Valutazione> getValutazioniRecenti(@PathVariable int numero) {
        return valutazioneService.getValutazioniRecenti(numero);
    }
}