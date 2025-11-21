package com.keyabita.keyabita.model;

// Modello che rappresenta un immobile da valutare o vendere.
// I campi rispecchiano la struttura della tabella 'immobili' nel database.

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "immobili")
public class Immobile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identificativo univoco
    
    private String indirizzo; // Indirizzo dell'immobile
    
    @ManyToOne
    @JoinColumn(name = "cap")
    private Cap cap; // CAP (FK)
    
    @ManyToOne
    @JoinColumn(name = "stato_immobile")
    private StatoImmobile statoImmobile; // Condizione dell'immobile (FK)
    
    private Integer piano; // Piano dell'immobile
    
    @Column(name = "numero_stanze")
    private Integer numeroStanze; // Numero di stanze
    
    @Column(name = "numero_bagni")
    private Integer numeroBagni; // Numero di bagni
    
    private Boolean balcone = false; // Presenza balcone
    private Boolean garage = false; // Presenza garage
    private Boolean giardino = false; // Presenza giardino
    private Boolean ascensore = false; // Presenza ascensore
    
    @Column(name = "anno_costruzione")
    private Integer annoCostruzione; // Anno di costruzione

    // Getter e Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getIndirizzo() { return indirizzo; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
    
    public Cap getCap() { return cap; }
    public void setCap(Cap cap) { this.cap = cap; }
    
    public StatoImmobile getStatoImmobile() { return statoImmobile; }
    public void setStatoImmobile(StatoImmobile statoImmobile) { this.statoImmobile = statoImmobile; }
    
    public Integer getPiano() { return piano; }
    public void setPiano(Integer piano) { this.piano = piano; }
    
    public Integer getNumeroStanze() { return numeroStanze; }
    public void setNumeroStanze(Integer numeroStanze) { this.numeroStanze = numeroStanze; }
    
    public Integer getNumeroBagni() { return numeroBagni; }
    public void setNumeroBagni(Integer numeroBagni) { this.numeroBagni = numeroBagni; }
    
    public Boolean getBalcone() { return balcone; }
    public void setBalcone(Boolean balcone) { this.balcone = balcone; }
    
    public Boolean getGarage() { return garage; }
    public void setGarage(Boolean garage) { this.garage = garage; }
    
    public Boolean getGiardino() { return giardino; }
    public void setGiardino(Boolean giardino) { this.giardino = giardino; }
    
    public Boolean getAscensore() { return ascensore; }
    public void setAscensore(Boolean ascensore) { this.ascensore = ascensore; }
    
    public Integer getAnnoCostruzione() { return annoCostruzione; }
    public void setAnnoCostruzione(Integer annoCostruzione) { this.annoCostruzione = annoCostruzione; }
}
