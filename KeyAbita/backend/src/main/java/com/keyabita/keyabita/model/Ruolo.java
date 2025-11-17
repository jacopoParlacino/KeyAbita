package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ruoli")
public class Ruolo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String nome;

    // Costruttori
    public Ruolo() {}

    public Ruolo(String nome) {
        this.nome = nome;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}