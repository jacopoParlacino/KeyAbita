package com.keyabita.keyabita.model;

// Modello che rappresenta una metratura/fascia di superficie per gli immobili.
// I campi rispecchiano la struttura della tabella 'metratura' nel database.

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "metratura")
public class Metratura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identificativo univoco
    
    @Column(length = 50, nullable = false)
    private String descrizione; // Descrizione della metratura (es. "50-100", "100-150")

    // Costruttori
    public Metratura() {}
    
    public Metratura(String descrizione) {
        this.descrizione = descrizione;
    }

    // Getter e Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getDescrizione() { return descrizione; }
    public void setDescrizione(String descrizione) { this.descrizione = descrizione; }
}
