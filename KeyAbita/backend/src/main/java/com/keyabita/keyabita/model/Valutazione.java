package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "valutazioni")
public class Valutazione implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "valore_massimo")
    private Integer valoreMassimo;
    
    @Column(name = "valore_stimato")
    private Integer valoreStimato;
    
    @Column(name = "valore_minimo")
    private Integer valoreMinimo;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_immobiliare")
    private Immobile immobile;
    
    @Column(name = "data_creazione")
    private LocalDate dataCreazione;

    // Costruttori
    public Valutazione() {}

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getValoreMassimo() {
        return valoreMassimo;
    }

    public void setValoreMassimo(Integer valoreMassimo) {
        this.valoreMassimo = valoreMassimo;
    }

    public Integer getValoreStimato() {
        return valoreStimato;
    }

    public void setValoreStimato(Integer valoreStimato) {
        this.valoreStimato = valoreStimato;
    }

    public Integer getValoreMinimo() {
        return valoreMinimo;
    }

    public void setValoreMinimo(Integer valoreMinimo) {
        this.valoreMinimo = valoreMinimo;
    }

    public Immobile getImmobile() {
        return immobile;
    }

    public void setImmobile(Immobile immobile) {
        this.immobile = immobile;
    }

    public LocalDate getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDate dataCreazione) {
        this.dataCreazione = dataCreazione;
    }
}