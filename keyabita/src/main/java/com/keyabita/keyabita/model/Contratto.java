package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "contratti")
public class Contratto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "inizio_contratto")
    private LocalDate inizioContratto;

    @Column(name = "fine_contratto")
    private LocalDate fineContratto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_richiesta", referencedColumnName = "id")
    private Richiesta richiesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stato_contratto", referencedColumnName = "id")
    private StatoContratto statoContratto;

    public Contratto(){};

    public Contratto(LocalDate inizioContratto, LocalDate fineContratto, Richiesta richiesta, StatoContratto statoContratto) {
        this.inizioContratto = inizioContratto;
        this.fineContratto = fineContratto;
        this.richiesta = richiesta;
        this.statoContratto = statoContratto;
    }

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
