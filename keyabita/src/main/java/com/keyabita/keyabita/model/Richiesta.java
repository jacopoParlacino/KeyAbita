package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "richieste")
public class Richiesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 30)
    private String nome;

    @Column(name = "cognome", length = 30)
    private String cognome;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "numero", length = 100)
    private String numero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_immobiliare", referencedColumnName = "id")
    private Immobile immobile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stato_richiesta", referencedColumnName = "id")
    private StatoRichiesta statoRichiesta;

    @Column(name = "data")
    private LocalDate data;

    // Getters and Setters
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

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }


}