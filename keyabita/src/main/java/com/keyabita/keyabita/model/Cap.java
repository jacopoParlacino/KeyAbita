package com.keyabita.keyabita.model;

// Modello che rappresenta un CAP con informazioni geografiche e economiche.
// I campi rispecchiano la struttura della tabella 'cap' nel database.

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "cap")
public class Cap implements Serializable {
    @Id
    private String cap; // CAP univoco (identificativo primario)
    
    @Column(name = "nome_citta", nullable = false)
    private String nomeCitta; // Nome della città
    
    @Column(name = "prezzo_metro_quadro", nullable = false)
    private Double prezzoMetroQuadro; // Prezzo per metro quadro (Double)

    // Costruttori
    public Cap() {}
    
    public Cap(String cap, String nomeCitta, Double prezzoMetroQuadro) {
        this.cap = cap;
        this.nomeCitta = nomeCitta;
        this.prezzoMetroQuadro = prezzoMetroQuadro;
    }

    // Getter e Setter
    public String getCap() { return cap; }
    public void setCap(String cap) { this.cap = cap; }
    
    public String getNomeCitta() { return nomeCitta; }
    public void setNomeCitta(String nomeCitta) { this.nomeCitta = nomeCitta; }
    
    public Double getPrezzoMetroQuadro() { return prezzoMetroQuadro; }
    public void setPrezzoMetroQuadro(Double prezzoMetroQuadro) { this.prezzoMetroQuadro = prezzoMetroQuadro; }
}
