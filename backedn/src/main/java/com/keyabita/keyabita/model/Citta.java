package com.keyabita.keyabita.model;

// Modello che rappresenta una città.
// I campi rispecchiano la struttura della tabella 'citta' nel database.

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "citta")
public class Citta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identificativo univoco
    
    @Column(length = 50, nullable = false)
    private String nome; // Nome della città

    // Costruttori
    public Citta() {}
    
    public Citta(String nome) {
        this.nome = nome;
    }

    // Getter e Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}
