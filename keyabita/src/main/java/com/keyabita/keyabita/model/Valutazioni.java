package com.keyabita.keyabita.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "valutazioni")
@JsonPropertyOrder({ 
    "id", 
    "immobile_id", 
    "valore_stimato", 
    "valore_minimo", 
    "valore_massimo", 
    "metodo", 
    "data_valutazione" 
})

public class Valutazioni {

        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "immobile_id", nullable = false)
    private Integer immobileId;

    @Column(name = "valore_stimato", precision = 12, scale = 2)
    private int valoreStimato;

    @Column(name = "valore_minimo", precision = 12, scale = 2)
    private int valoreMinimo;

    @Column(name = "valore_massimo", precision = 12, scale = 2)
    private int valoreMassimo;

    @Column(nullable = false)
    private String metodo; 

    @Column(name = "data_valutazione")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dataValutazione;

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getImmobileId() {
        return immobileId;
    }

    public void setImmobileId(Integer immobileId) {
        this.immobileId = immobileId;
    }

    public int getValoreStimato() {
        return valoreStimato;
    }

    public void setValoreStimato(int valoreStimato) {
        this.valoreStimato = valoreStimato;
    }

    public int getValoreMinimo() {
        return valoreMinimo;
    }

    public void setValoreMinimo(int valoreMinimo) {
        this.valoreMinimo = valoreMinimo;
    }

    public int getValoreMassimo() {
        return valoreMassimo;
    }

    public void setValoreMassimo(int valoreMassimo) {
        this.valoreMassimo = valoreMassimo;
    }

    public String getMetodo() {
        return metodo;
    }

    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }

    public Date getDataValutazione() {
        return dataValutazione;
    }

    public void setDataValutazione(Date dataValutazione) {
        this.dataValutazione = dataValutazione;
    }

}
