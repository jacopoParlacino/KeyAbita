package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Metratura;
import com.keyabita.keyabita.services.IMetraturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/metratura")
@CrossOrigin(origins = "*")
public class MetraturaController {

    @Autowired
    private IMetraturaService metraturaService;

    @GetMapping
    public List<Metratura> getAllMetratura() {
        return metraturaService.trovaTutteMetrature();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Metratura> getMetraturaById(@PathVariable Integer id) {
        return metraturaService.trovaMetraturaPerId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/descrizione/{descrizione}")
    public ResponseEntity<Metratura> getMetraturaByDescrizione(@PathVariable String descrizione) {
        return metraturaService.trovaMetraturaPerDescrizione(descrizione)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Metratura> createMetratura(@RequestBody Metratura metratura) {
        Metratura savedMetratura = metraturaService.salvaMetratura(metratura);
        return ResponseEntity.ok(savedMetratura);
    }
}
