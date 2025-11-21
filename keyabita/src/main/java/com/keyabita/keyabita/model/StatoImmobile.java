package com.keyabita.keyabita.model;

// Modello che rappresenta uno stato possibile per un immobile.
// I campi rispecchiano la struttura della tabella 'stati_immobili' nel database.

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "stati_immobili")
public class StatoImmobile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identificativo univoco
    
    @Column(length = 100, nullable = false)
    private String nome; // Nome dello stato (es. "Nuovo", "Buone Condizioni", "Da ristrutturare")

    // Costruttori
    public StatoImmobile() {}
    
    public StatoImmobile(String nome) {
        this.nome = nome;
    }

    // Getter e Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}
