package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.services.IUtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/utenti")
@CrossOrigin(origins = "http://localhost:3000")
public class UtenteController {

    @Autowired
    private IUtenteService utenteService;

    @GetMapping
    public ResponseEntity<List<Utente>> getAllUtenti() {
        try {
            List<Utente> utenti = utenteService.getAllUtenti();
            return new ResponseEntity<>(utenti, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utente> getUtenteById(@PathVariable("id") Integer id) {
        try {
            Optional<Utente> utente = utenteService.getUtenteById(id);
            if (utente.isPresent()) {
                return new ResponseEntity<>(utente.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Utente> getUtenteByEmail(@PathVariable("email") String email) {
        try {
            Optional<Utente> utente = utenteService.getUtenteByEmail(email);
            if (utente.isPresent()) {
                return new ResponseEntity<>(utente.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Utente>> searchUtenti(@RequestParam("q") String searchTerm) {
        try {
            List<Utente> utenti = utenteService.searchUtenti(searchTerm);
            return new ResponseEntity<>(utenti, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ruolo/{ruolo}")
    public ResponseEntity<List<Utente>> getUtentiByRuolo(@PathVariable("ruolo") String ruolo) {
        try {
            List<Utente> utenti = utenteService.getUtentiByRuolo(ruolo);
            return new ResponseEntity<>(utenti, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Utente> createUtente(@RequestBody Utente utente) {
        try {
            if (utenteService.existsByEmail(utente.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            Utente savedUtente = utenteService.saveUtente(utente);
            return new ResponseEntity<>(savedUtente, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utente> updateUtente(@PathVariable("id") Integer id, @RequestBody Utente utente) {
        try {
            Optional<Utente> existingUtente = utenteService.getUtenteById(id);
            if (existingUtente.isPresent()) {
                utente.setId(id);
                Utente updatedUtente = utenteService.saveUtente(utente);
                return new ResponseEntity<>(updatedUtente, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUtente(@PathVariable("id") Integer id) {
        try {
            utenteService.deleteUtente(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint per admin
    @GetMapping("/agenti")
    public ResponseEntity<List<Utente>> getAllAgenti() {
        try {
            List<Utente> agenti = utenteService.getAllAgenti();
            return new ResponseEntity<>(agenti, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<String> resetPassword(@PathVariable("id") Integer id, @RequestBody Map<String, String> request) {
        try {
            String newPassword = request.get("newPassword");
            if (newPassword == null || newPassword.trim().isEmpty()) {
                return new ResponseEntity<>("Password non può essere vuota", HttpStatus.BAD_REQUEST);
            }
            
            boolean success = utenteService.resetPassword(id, newPassword);
            if (success) {
                return new ResponseEntity<>("Password resettata con successo", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Utente non trovato", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Errore nel reset password", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/admin")
    public ResponseEntity<Utente> updateUtenteAdmin(@PathVariable("id") Integer id, @RequestBody Utente utente) {
        try {
            Utente updatedUtente = utenteService.updateUtente(id, utente);
            if (updatedUtente != null) {
                return new ResponseEntity<>(updatedUtente, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}