package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.StatoImmobile;
import com.keyabita.keyabita.services.IStatoImmobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stati-immobile")
@CrossOrigin(origins = "*")
public class StatoImmobileController {

    @Autowired
    private IStatoImmobileService statoImmobileService;

    @GetMapping
    public List<StatoImmobile> getAllStatiImmobile() {
        return statoImmobileService.trovaTuttiStatiImmobile();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatoImmobile> getStatoImmobileById(@PathVariable Integer id) {
        return statoImmobileService.trovaStatoImmobilePerId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<StatoImmobile> getStatoImmobileByNome(@PathVariable String nome) {
        return statoImmobileService.trovaStatoImmobilePerNome(nome)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StatoImmobile> createStatoImmobile(@RequestBody StatoImmobile statoImmobile) {
        StatoImmobile savedStato = statoImmobileService.salvaStatoImmobile(statoImmobile);
        return ResponseEntity.ok(savedStato);
    }
}
