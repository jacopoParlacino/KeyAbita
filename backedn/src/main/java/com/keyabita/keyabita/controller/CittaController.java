package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Citta;
import com.keyabita.keyabita.services.ICittaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/citta")
@CrossOrigin(origins = "*")
public class CittaController {

    @Autowired
    private ICittaService cittaService;

    @GetMapping
    public List<Citta> getAllCitta() {
        return cittaService.trovaTutteCitta();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Citta> getCittaById(@PathVariable Integer id) {
        return cittaService.trovaCittaPerId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Citta> getCittaByNome(@PathVariable String nome) {
        return cittaService.trovaCittaPerNome(nome)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Citta> createCitta(@RequestBody Citta citta) {
        Citta savedCitta = cittaService.salvaCitta(citta);
        return ResponseEntity.ok(savedCitta);
    }
}
