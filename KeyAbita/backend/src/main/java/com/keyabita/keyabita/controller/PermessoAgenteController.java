package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.PermessoAgente;
import com.keyabita.keyabita.services.IPermessoAgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/permessi")
@CrossOrigin(origins = "http://localhost:3000")
public class PermessoAgenteController {

    @Autowired
    private IPermessoAgenteService permessoAgenteService;

    @GetMapping("/agente/{idAgente}")
    public ResponseEntity<Map<String, Map<String, Boolean>>> getPermessiAgente(@PathVariable("idAgente") Integer idAgente) {
        try {
            Map<String, Map<String, Boolean>> permessi = permessoAgenteService.getPermessiMapByAgente(idAgente);
            return new ResponseEntity<>(permessi, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/agente/{idAgente}/moduli")
    public ResponseEntity<List<String>> getModuliAbilitati(@PathVariable("idAgente") Integer idAgente) {
        try {
            List<String> moduli = permessoAgenteService.getModuliAbilitatiByAgente(idAgente);
            return new ResponseEntity<>(moduli, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/agente/{idAgente}/check/{modulo}/{permesso}")
    public ResponseEntity<Boolean> checkPermesso(
            @PathVariable("idAgente") Integer idAgente,
            @PathVariable("modulo") String modulo,
            @PathVariable("permesso") String permesso) {
        try {
            boolean hasPermesso = permessoAgenteService.hasPermesso(idAgente, modulo, permesso);
            return new ResponseEntity<>(hasPermesso, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/agente/{idAgente}")
    public ResponseEntity<List<PermessoAgente>> updatePermessiAgente(
            @PathVariable("idAgente") Integer idAgente,
            @RequestBody Map<String, Map<String, Boolean>> permessi) {
        try {
            List<PermessoAgente> result = permessoAgenteService.updatePermessiAgente(idAgente, permessi);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/agente/{idAgente}/initialize")
    public ResponseEntity<String> initializePermessi(@PathVariable("idAgente") Integer idAgente) {
        try {
            permessoAgenteService.initializePermessiForAgente(idAgente);
            return new ResponseEntity<>("Permessi inizializzati con successo", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Errore nell'inizializzazione permessi", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/agente/{idAgente}/{modulo}/{permesso}")
    public ResponseEntity<PermessoAgente> updateSingoloPermesso(
            @PathVariable("idAgente") Integer idAgente,
            @PathVariable("modulo") String modulo,
            @PathVariable("permesso") String permesso,
            @RequestBody Map<String, Boolean> request) {
        try {
            Boolean abilitato = request.get("abilitato");
            if (abilitato == null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            
            PermessoAgente result = permessoAgenteService.updatePermesso(idAgente, modulo, permesso, abilitato);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}