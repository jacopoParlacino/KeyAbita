package com.keyabita.keyabita.controller;

import com.keyabita.keyabita.dto.ImmobileRichiestaDTO;
import com.keyabita.keyabita.model.Cap;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.model.Richiesta;
import com.keyabita.keyabita.model.StatoImmobile;
import com.keyabita.keyabita.services.ICapService;
import com.keyabita.keyabita.services.IImmobileService;
import com.keyabita.keyabita.services.IMetraturaService;
import com.keyabita.keyabita.services.IStatoImmobileService;
import com.keyabita.keyabita.services.StatoRichiestaService;
import com.keyabita.keyabita.services.RichiestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/invio-richiesta")
@CrossOrigin(origins = "*")
public class InvioRichiestaController {
    
    @Autowired
    private IImmobileService immobileService;
    
    @Autowired
    private ICapService capService;
    
    @Autowired
    private IStatoImmobileService statoImmobileService;
    
    @Autowired
    private IMetraturaService metraturaService;
    
    @Autowired
    private StatoRichiestaService statoRichiestaService;
    
    @Autowired
    private RichiestaService richiestaService;
    
    // POST: Salva immobile e richiesta insieme
    @PostMapping
    public ResponseEntity<?> invioRichiesta(@RequestBody ImmobileRichiestaDTO dto) {
        try {
            // Crea l'immobile
            Immobile immobile = new Immobile();
            immobile.setIndirizzo(dto.getIndirizzo());
            immobile.setPiano(dto.getPiano());
            immobile.setNumeroStanze(dto.getNumeroStanze());
            immobile.setNumeroBagni(dto.getNumeroBagni());
            immobile.setBalcone(dto.getBalcone() != null ? dto.getBalcone() : false);
            immobile.setGarage(dto.getGarage() != null ? dto.getGarage() : false);
            immobile.setGiardino(dto.getGiardino() != null ? dto.getGiardino() : false);
            immobile.setAscensore(dto.getAscensore() != null ? dto.getAscensore() : false);
            immobile.setAnnoCostruzione(dto.getAnnoCostruzione());
            
            // Recupera CAP
            if (dto.getCap() != null) {
                Optional<Cap> cap = capService.trovaCapPerId(dto.getCap());
                cap.ifPresent(immobile::setCap);
            }
            
            // Recupera StatoImmobile
            if (dto.getStatoImmobileId() != null) {
                Optional<StatoImmobile> stato = statoImmobileService.trovaStatoImmobilePerId(dto.getStatoImmobileId());
                stato.ifPresent(immobile::setStatoImmobile);
            }
            
            // Recupera Metratura
            if (dto.getMetraturId() != null) {
                Optional<com.keyabita.keyabita.model.Metratura> metratura = metraturaService.trovaMetraturaPerId(dto.getMetraturId());
                metratura.ifPresent(immobile::setMetratura);
            }
            
            // Salva l'immobile
            Immobile immobileSalvato = immobileService.salvaImmobile(immobile);
            
            // Crea la richiesta
            Richiesta richiesta = new Richiesta();
            richiesta.setNome(dto.getNome());
            richiesta.setCognome(dto.getCognome());
            richiesta.setEmail(dto.getEmail());
            richiesta.setNumero(dto.getNumero());
            richiesta.setImmobile(immobileSalvato);
            richiesta.setData(dto.getData() != null ? dto.getData() : LocalDate.now());
            
            // Recupera StatoRichiesta
            if (dto.getStatoRichiestaId() != null) {
                Optional<com.keyabita.keyabita.model.StatoRichiesta> statoRichiesta = statoRichiestaService.trovaStatoRichiestaConId(dto.getStatoRichiestaId());
                statoRichiesta.ifPresent(richiesta::setStatoRichiesta);
            }
            
            // Salva la richiesta
            Richiesta richiestaSalvata = richiestaService.salvaRichiesta(richiesta);
            
            // Ritorna una risposta con entrambi gli oggetti
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("immobile", immobileSalvato);
            response.put("richiesta", richiestaSalvata);
            response.put("messaggio", "Richiesta inviata con successo");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new java.util.HashMap<>();
            errorResponse.put("error", "Errore durante l'invio della richiesta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
