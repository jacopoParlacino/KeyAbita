package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Contratto;
import com.keyabita.keyabita.model.StatoContratto;
import com.keyabita.keyabita.services.IContrattoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/contratti")
@CrossOrigin(origins = "*")
public class ContrattoController {

    @Autowired
    private IContrattoService contrattoService;

    @GetMapping
    public List<Contratto> getAllContratti() {
        return contrattoService.getAllContratti();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contratto> getContrattoById(@PathVariable Integer id) {
        return contrattoService.getContrattoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stato/{nomeStato}")
    public List<Contratto> getContrattiByStato(@PathVariable String nomeStato) {
        return contrattoService.getContrattiByStato(nomeStato);
    }

    @GetMapping("/attivi")
    public List<Contratto> getContrattiAttivi() {
        return contrattoService.getContrattiAttivi();
    }

    @GetMapping("/scadenza/{giorni}")
    public List<Contratto> getContrattiInScadenza(@PathVariable int giorni) {
        return contrattoService.getContrattiInScadenza(giorni);
    }

    @GetMapping("/periodo")
    public List<Contratto> getContrattiByPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInizio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFine) {
        return contrattoService.getContrattiByPeriodo(dataInizio, dataFine);
    }

    @PostMapping
    public ResponseEntity<Contratto> createContratto(@RequestBody Contratto contratto) {
        Contratto savedContratto = contrattoService.saveContratto(contratto);
        return ResponseEntity.ok(savedContratto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contratto> updateContratto(@PathVariable Integer id, @RequestBody Contratto contratto) {
        return contrattoService.getContrattoById(id)
                .map(existingContratto -> {
                    contratto.setId(id);
                    return ResponseEntity.ok(contrattoService.saveContratto(contratto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContratto(@PathVariable Integer id) {
        return contrattoService.getContrattoById(id)
                .map(contratto -> {
                    contrattoService.deleteContratto(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stati")
    public List<StatoContratto> getAllStatiContratto() {
        return contrattoService.getAllStatiContratto();
    }
}