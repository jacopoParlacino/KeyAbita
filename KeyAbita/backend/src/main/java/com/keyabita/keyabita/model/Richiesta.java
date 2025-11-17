package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "richieste")
public class Richiesta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String nome;
    private String cognome;
    private String email;
    private String numero;
    private LocalDate data;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_immobiliare")
    private Immobile immobile;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stato_richiesta")
    private StatoRichiesta statoRichiesta;

    // Costruttori
    public Richiesta() {}

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

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Immobile getImmobile() {
        return immobile;
    }

    public void setImmobile(Immobile immobile) {
        this.immobile = immobile;
    }

    public StatoRichiesta getStatoRichiesta() {
        return statoRichiesta;
    }

    public void setStatoRichiesta(StatoRichiesta statoRichiesta) {
        this.statoRichiesta = statoRichiesta;
    }
}