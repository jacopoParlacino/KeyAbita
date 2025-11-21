package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.model.Cap;
import com.keyabita.keyabita.services.ICapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cap")
@CrossOrigin(origins = "*")
public class CapController {

    @Autowired
    private ICapService capService;

    @GetMapping
    public List<Cap> getAllCap() {
        return capService.trovaTuttiCap();
    }

    @GetMapping("/{cap}")
    public ResponseEntity<Cap> getCapById(@PathVariable String cap) {
        return capService.trovaCapPerId(cap)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/citta/{nomeCitta}")
    public ResponseEntity<Cap> getCapByNomeCitta(@PathVariable String nomeCitta) {
        return capService.trovaCapPerNomeCitta(nomeCitta)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cap> createCap(@RequestBody Cap cap) {
        Cap savedCap = capService.salvaCap(cap);
        return ResponseEntity.ok(savedCap);
    }
}
