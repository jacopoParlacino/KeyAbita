package com.keyabita.keyabita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keyabita.keyabita.model.Ruolo;
import com.keyabita.keyabita.services.RuoloService;

@RestController
@RequestMapping("/api/ruoli")
public class RuoloController {

    @Autowired
    private RuoloService ruoloService;

    @GetMapping
    public List<Ruolo> getAllRuoli() {
        return ruoloService.getAllRuoli();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ruolo> getRuoloById(@PathVariable Integer id) {
        Ruolo ruolo = ruoloService.getRuoloById(id);
        if (ruolo != null) {
            return ResponseEntity.ok(ruolo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Ruolo createRuolo(@RequestBody Ruolo nuovoRuolo) {
        return ruoloService.createRuolo(nuovoRuolo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ruolo> updateRuolo(@PathVariable Integer id, @RequestBody Ruolo ruoloAggiornato) {
        Ruolo aggiornato = ruoloService.updateRuolo(id, ruoloAggiornato);
        if (aggiornato != null) {
            return ResponseEntity.ok(aggiornato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRuolo(@PathVariable Integer id) {
        ruoloService.deleteRuolo(id);
        return ResponseEntity.noContent().build();
    }
}