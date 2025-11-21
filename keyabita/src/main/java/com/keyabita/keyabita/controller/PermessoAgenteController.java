package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.PermessoAgente;
import com.keyabita.keyabita.services.PermessoAgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/permessi")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PermessoAgenteController {

    @Autowired
    private PermessoAgenteService permessoService;

    /**
     * Recupera tutti i permessi di un agente
     */
    @GetMapping("/agente/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<List<PermessoAgente>> getPermessiAgente(@PathVariable Integer id) {
        List<PermessoAgente> permessi = permessoService.getPermessiByAgente(id);
        return ResponseEntity.ok(permessi);
    }

    /**
     * Recupera un permesso specifico di un agente per un modulo
     */
    @GetMapping("/agente/{id}/modulo/{modulo}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<PermessoAgente> getPermessoAgente(
            @PathVariable Integer id,
            @PathVariable String modulo) {
        Optional<PermessoAgente> permesso = permessoService.getPermessoByAgenteAndModulo(id, modulo);
        return permesso.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Verifica se un agente ha un permesso specifico
     */
    @GetMapping("/agente/{id}/check/{modulo}/{azione}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<Boolean> checkPermesso(
            @PathVariable Integer id,
            @PathVariable String modulo,
            @PathVariable String azione) {
        Optional<PermessoAgente> permesso = permessoService.getPermessoByAgenteAndModulo(id, modulo);
        if (permesso.isEmpty()) {
            return ResponseEntity.ok(false);
        }

        PermessoAgente p = permesso.get();
        boolean hasPermesso = switch (azione.toLowerCase()) {
            case "visualizza" -> p.getVisualizza();
            case "creare" -> p.getCreare();
            case "modificare" -> p.getModificare();
            case "eliminare" -> p.getEliminare();
            default -> false;
        };

        return ResponseEntity.ok(hasPermesso);
    }

    /**
     * Crea permessi di default per un nuovo agente
     */
    @PostMapping("/agente/{id}/initialize")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> initializePermessiAgente(@PathVariable Integer id) {
        permessoService.initializePermessiForAgente(id);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * Aggiorna il permesso di un agente per un modulo specifico
     */
    @PutMapping("/agente/{id}/modulo/{modulo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PermessoAgente> updatePermessoAgente(
            @PathVariable Integer id,
            @PathVariable String modulo,
            @RequestBody PermessoAgente permessoUpdate) {
        PermessoAgente updated = permessoService.updatePermesso(id, modulo, permessoUpdate);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Elimina i permessi di un agente
     */
    @DeleteMapping("/agente/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePermessiAgente(@PathVariable Integer id) {
        permessoService.deletePermessiByAgente(id);
        return ResponseEntity.noContent().build();
    }
}
