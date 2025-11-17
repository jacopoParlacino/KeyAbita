package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "stati_contratti")
public class StatoContratto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String nome;
    private String descrizione;

    // Costruttori
    public StatoContratto() {}

    public StatoContratto(String nome, String descrizione) {
        this.nome = nome;
        this.descrizione = descrizione;
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

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
}