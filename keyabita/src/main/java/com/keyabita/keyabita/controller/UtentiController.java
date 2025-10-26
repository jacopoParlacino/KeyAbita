package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utenti")
public class UtentiController {
    @Autowired
    private UtenteService utenteService; // Service per la logica di business

    // Restituisce tutti gli utenti
    @GetMapping
    public List<Utente> getAll() {
        return utenteService.getAllUtenti();
    }

    // Restituisce un utente per ID
    @GetMapping("/{id}")
    public ResponseEntity<Utente> getById(@PathVariable int id) {
        return utenteService.getUtenteById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Crea un nuovo utente
    @PostMapping
    public ResponseEntity<Utente> create(@RequestBody Utente utente) {
        Utente saved = utenteService.saveUtente(utente);
        return ResponseEntity.ok(saved);
    }

    // Aggiorna un utente esistente
    @PutMapping("/{id}")
    public ResponseEntity<Utente> update(@PathVariable int id, @RequestBody Utente utente) {
        if (!utenteService.getUtenteById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        utente.setId(id);
        return ResponseEntity.ok(utenteService.saveUtente(utente));
    }

    // Elimina un utente per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!utenteService.getUtenteById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        utenteService.deleteUtente(id);
        return ResponseEntity.noContent().build();
    }

    // Ricerca per email
    @GetMapping("/email/{email}")
    public ResponseEntity<Utente> getByEmail(@PathVariable String email) {
        return utenteService.getUtenteByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Ricerca per cognome
    @GetMapping("/cognome/{cognome}")
    public List<Utente> getByCognome(@PathVariable String cognome) {
        return utenteService.getUtentiByCognome(cognome);
    }

    // Aggiorna parzialmente un utente esistente (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Utente> patchUtente(@PathVariable int id, @RequestBody Utente patch) {
        return utenteService.getUtenteById(id)
            .map(existing -> {
                if (patch.getNome() != null) existing.setNome(patch.getNome());
                if (patch.getCognome() != null) existing.setCognome(patch.getCognome());
                if (patch.getEmail() != null) existing.setEmail(patch.getEmail());
                if (patch.getRuolo() != null) existing.setRuolo(patch.getRuolo());
                if (patch.getTelefono() != null) existing.setTelefono(patch.getTelefono());
                return ResponseEntity.ok(utenteService.saveUtente(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}