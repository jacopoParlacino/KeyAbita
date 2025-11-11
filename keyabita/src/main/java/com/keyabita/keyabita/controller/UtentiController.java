package com.keyabita.keyabita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.services.UtenteService;

@RestController
@RequestMapping("/api/utenti")
public class UtentiController {

    @Autowired
    private UtenteService utentiService;

    @GetMapping
    public List<Utente> getAllUtenti() {
        return utentiService.getAllUtenti();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utente> getUtenteById(@PathVariable Integer id) {
        Utente utente = utentiService.getUtenteById(id);
        if (utente != null) {
            return ResponseEntity.ok(utente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Utente> getUtenteByEmail(@PathVariable String email) {
        Utente utente = utentiService.getUtenteByEmail(email);
        if (utente != null) {
            return ResponseEntity.ok(utente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Utente createUtente(@RequestBody Utente nuovoUtente) {
        return utentiService.createUtente(nuovoUtente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utente> updateUtente(@PathVariable Integer id, @RequestBody Utente utenteAggiornato) {
        Utente aggiornato = utentiService.updateUtente(id, utenteAggiornato);
        if (aggiornato != null) {
            return ResponseEntity.ok(aggiornato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtente(@PathVariable Integer id) {
        utentiService.deleteUtente(id);
        return ResponseEntity.noContent().build();
    }
}