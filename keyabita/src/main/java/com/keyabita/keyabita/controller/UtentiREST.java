package com.keyabita.keyabita.controller;

// Controller REST che gestisce le richieste HTTP per gli utenti.
// Espone endpoint per CRUD, ricerca e aggiornamento parziale degli utenti.

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utenti")
public class UtentiREST {
    @Autowired
    private UtenteService utenteService; // Service per la logica di business

    // Restituisce tutti gli utenti
    @GetMapping
    public List<Utente> getAll() {
        return utenteService.getAll();
    }

    // Restituisce un utente per ID
    @GetMapping("/{id}")
    public ResponseEntity<Utente> getById(@PathVariable int id) {
        return utenteService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Crea un nuovo utente
    @PostMapping
    public ResponseEntity<Utente> crea(@RequestBody Utente utente) {
        Utente salvato = utenteService.salva(utente);
        return ResponseEntity.ok(salvato);
    }

    // Aggiorna un utente esistente
    @PutMapping("/{id}")
    public ResponseEntity<Utente> aggiorna(@PathVariable int id, @RequestBody Utente utente) {
        if (!utenteService.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        utente.setId(id);
        return ResponseEntity.ok(utenteService.salva(utente));
    }

    // Elimina un utente per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable int id) {
        boolean esiste = utenteService.elimina(id);
        return esiste ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Ricerca per email
    @GetMapping("/email/{email}")
    public List<Utente> getByEmail(@PathVariable String email) {
        return utenteService.getByEmail(email);
    }

    // Ricerca per cognome
    @GetMapping("/cognome/{cognome}")
    public List<Utente> getByCognome(@PathVariable String cognome) {
        return utenteService.getByCognome(cognome);
    }

    // Aggiorna parzialmente un utente esistente (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Utente> patchUtente(@PathVariable int id, @RequestBody Utente patch) {
        return utenteService.getById(id)
            .map(existing -> {
                if (patch.getNome() != null) existing.setNome(patch.getNome());
                if (patch.getCognome() != null) existing.setCognome(patch.getCognome());
                if (patch.getEmail() != null) existing.setEmail(patch.getEmail());
                if (patch.getTelefono() != null) existing.setTelefono(patch.getTelefono());
                if (patch.getIndirizzo() != null) existing.setIndirizzo(patch.getIndirizzo());
                return ResponseEntity.ok(utenteService.salva(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
