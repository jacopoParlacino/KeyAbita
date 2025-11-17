package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "contratti")
public class Contratto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "inizio_contratto")
    private LocalDate inizioContratto;
    
    @Column(name = "fine_contratto")
    private LocalDate fineContratto;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_richiesta")
    private Richiesta richiesta;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stato_contratto")
    private StatoContratto statoContratto;

    // Costruttori
    public Contratto() {}

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getInizioContratto() {
        return inizioContratto;
    }

    public void setInizioContratto(LocalDate inizioContratto) {
        this.inizioContratto = inizioContratto;
    }

    public LocalDate getFineContratto() {
        return fineContratto;
    }

    public void setFineContratto(LocalDate fineContratto) {
        this.fineContratto = fineContratto;
    }

    public Richiesta getRichiesta() {
        return richiesta;
    }

    public void setRichiesta(Richiesta richiesta) {
        this.richiesta = richiesta;
    }

    public StatoContratto getStatoContratto() {
        return statoContratto;
    }

    public void setStatoContratto(StatoContratto statoContratto) {
        this.statoContratto = statoContratto;
    }
}