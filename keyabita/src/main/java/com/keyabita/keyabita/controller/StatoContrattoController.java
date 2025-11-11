package com.keyabita.keyabita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.keyabita.keyabita.services.StatoContrattoServiceImpl;

import com.keyabita.keyabita.model.StatoContratto;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/statocontratto")
@CrossOrigin(origins = "*")
public class StatoContrattoController {

    @Autowired
    StatoContrattoServiceImpl statoContrattoService;

    @GetMapping("/")
    public List<StatoContratto> getMethodName() {
        return statoContrattoService.trovaTuttiStatoContratto();
    }
    

}
