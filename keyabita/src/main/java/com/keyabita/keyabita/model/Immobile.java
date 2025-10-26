package com.keyabita.keyabita.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.*;

@Entity
@Table(name = "immobili")
@JsonPropertyOrder({
    "id_immobile",
    "tipologia",
    "indirizzo",
    "citta",
    "superficie",
    "prezzo",
    "numero_stanze",
    "numero_bagni",
    "data_inserimento",
    "stato",
    "note"
})
public class Immobile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_immobile;

    @Column(nullable = false)
    private String tipologia;  // appartamento, villa, ufficio, etc.

    @Column(nullable = false)
    private String indirizzo;

    @Column(nullable = false)
    private String citta;

    @Column(nullable = false)
    private Integer superficie;  // in metri quadri

    @Column(nullable = false)
    private Double prezzo;

    @Column(name = "numero_stanze", nullable = false)
    private Integer numeroStanze;

    @Column(name = "numero_bagni")
    private Integer numeroBagni;

    @Column(name = "data_inserimento")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataInserimento;

    @Column(nullable = false)
    private String stato;  // disponibile, venduto, in_trattativa

    private String note;  // Note aggiuntive

    // Getters and Setters
    public Integer getId_immobile() {
        return id_immobile;
    }

    public void setId_immobile(Integer id_immobile) {
        this.id_immobile = id_immobile;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public Integer getSuperficie() {
        return superficie;
    }

    public void setSuperficie(Integer superficie) {
        this.superficie = superficie;
    }

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
    }

    public Integer getNumeroStanze() {
        return numeroStanze;
    }

    public void setNumeroStanze(Integer numeroStanze) {
        this.numeroStanze = numeroStanze;
    }

    public Integer getNumeroBagni() {
        return numeroBagni;
    }

    public void setNumeroBagni(Integer numeroBagni) {
        this.numeroBagni = numeroBagni;
    }

    public Date getDataInserimento() {
        return dataInserimento;
    }

    public void setDataInserimento(Date dataInserimento) {
        this.dataInserimento = dataInserimento;
    }

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}