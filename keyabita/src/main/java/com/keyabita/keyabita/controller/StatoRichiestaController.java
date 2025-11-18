package com.keyabita.keyabita.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.keyabita.keyabita.services.StatoRichiestaService;
import com.keyabita.keyabita.model.StatoRichiesta;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/statorichiesta")
@CrossOrigin(origins = "*")
public class StatoRichiestaController {

    @Autowired
    StatoRichiestaService statoRichiestaService;

    @GetMapping("/")
    public List<StatoRichiesta> tuttiStatoRichiesta() {
        return statoRichiestaService.trovaTuttiStatiRichiesta();
    }


    @GetMapping("/count")
    public long numeroStatiRichiesta() {
        return statoRichiestaService.numeroStatiRichiesta();
    }

    @GetMapping("/{id}")
    public Optional<StatoRichiesta> statoRichiestaConId(@PathVariable int id) {
        return statoRichiestaService.trovaStatoRichiestaConId(id);
    }
    

}
