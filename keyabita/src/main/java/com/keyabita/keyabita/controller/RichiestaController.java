package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Richiesta;
import com.keyabita.keyabita.services.RichiestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/richieste")
@CrossOrigin(origins = "*") // Permette richieste da qualsiasi origine
public class RichiestaController {
    
    @Autowired
    private RichiestaService richiestaService;
    
    // GET: Ottieni tutte le richieste
    @GetMapping
    public ResponseEntity<List<Richiesta>> getTutteRichieste() {
        List<Richiesta> richieste = richiestaService.trovaTutteRichieste();
        return ResponseEntity.ok(richieste);
    }
    
    // GET: Ottieni richiesta per ID
    @GetMapping("/{id}")
    public ResponseEntity<Richiesta> getRichiestaPerId(@PathVariable int id) {
        Optional<Richiesta> richiesta = richiestaService.trovaRichiestaConId(id);
        return richiesta.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST: Crea nuova richiesta
    @PostMapping
    public ResponseEntity<Richiesta> creaRichiesta(@RequestBody Richiesta richiesta) {
        // Qui potremmo aggiungere validazioni se necessario
        // La data verrà impostata al momento della creazione se non fornita
        if (richiesta.getData() == null) {
            richiesta.setData(java.time.LocalDate.now());
        }
        Richiesta salvata = richiestaService.salvaRichiesta(richiesta);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvata);
    }
    
    // GET: Trova richieste per stato richiesta
    @GetMapping("/stato/{statoId}")
    public ResponseEntity<List<Richiesta>> getRichiestePerStato(@PathVariable int statoId) {
        List<Richiesta> richieste = richiestaService.trovaRichiesteConStato(statoId);
        return ResponseEntity.ok(richieste);
    }
    
    // GET: Trova richiesta per immobile
    @GetMapping("/immobile/{immobileId}")
    public ResponseEntity<Richiesta> getRichiestaPerImmobile(@PathVariable int immobileId) {
        Optional<Richiesta> richiesta = richiestaService.trovaRichiestaConImmobile(immobileId);
        return richiesta.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // GET: Trova richieste per email
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Richiesta>> getRichiestePerEmail(@PathVariable String email) {
        List<Richiesta> richieste = richiestaService.trovaRichiesteConEmail(email);
        return ResponseEntity.ok(richieste);
    }
    
    // GET: Trova richieste per numero di telefono
    @GetMapping("/numero/{numero}")
    public ResponseEntity<List<Richiesta>> getRichiestePerNumero(@PathVariable String numero) {
        List<Richiesta> richieste = richiestaService.trovaRichiesteConNumero(numero);
        return ResponseEntity.ok(richieste);
    }
    
    // PUT: Aggiorna una richiesta
    @PutMapping("/{id}")
    public ResponseEntity<Richiesta> aggiornaRichiesta(@PathVariable int id, @RequestBody Richiesta richiestaAggiornata) {
        Optional<Richiesta> richiestaEsistente = richiestaService.trovaRichiestaConId(id);
        if (richiestaEsistente.isPresent()) {
            Richiesta richiesta = richiestaEsistente.get();
            // Aggiorna i campi
            if (richiestaAggiornata.getNome() != null) {
                richiesta.setNome(richiestaAggiornata.getNome());
            }
            if (richiestaAggiornata.getCognome() != null) {
                richiesta.setCognome(richiestaAggiornata.getCognome());
            }
            if (richiestaAggiornata.getEmail() != null) {
                richiesta.setEmail(richiestaAggiornata.getEmail());
            }
            if (richiestaAggiornata.getNumero() != null) {
                richiesta.setNumero(richiestaAggiornata.getNumero());
            }
            if (richiestaAggiornata.getImmobile() != null) {
                richiesta.setImmobile(richiestaAggiornata.getImmobile());
            }
            if (richiestaAggiornata.getStatoRichiesta() != null) {
                richiesta.setStatoRichiesta(richiestaAggiornata.getStatoRichiesta());
            }
            if (richiestaAggiornata.getData() != null) {
                richiesta.setData(richiestaAggiornata.getData());
            }
            return ResponseEntity.ok(richiesta);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE: Elimina una richiesta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaRichiesta(@PathVariable int id) {
        Optional<Richiesta> richiesta = richiestaService.trovaRichiestaConId(id);
        if (richiesta.isPresent()) {
            // Implementare il metodo di eliminazione nel service e repository
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
