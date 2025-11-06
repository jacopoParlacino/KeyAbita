package com.keyabita.keyabita.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stati_contratti")
public class StatoContratto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "descrizione", length = 255)
    private String descrizione;

    public StatoContratto() {
    }

    public StatoContratto(String nome, String descrizione) {
        this.nome = nome;
        this.descrizione = descrizione;
    }

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