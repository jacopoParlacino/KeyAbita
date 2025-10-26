package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "vendite")
public class Vendite {

    public enum MetodoPagamento {
        BONIFICO,
        CONTANTI,
        MUTUO,
        ALTRO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "immobile_id", nullable = false)
    private Integer immobileId;

    @Column(name = "acquirente_nome", length = 100)
    private String acquirenteNome;

    @Column(name = "acquirente_cognome", length = 100)
    private String acquirenteCognome;

    @Column(name = "acquirente_email", length = 150)
    private String acquirenteEmail;

    @Column(name = "prezzo_finale", precision = 12, scale = 2)
    private BigDecimal prezzoFinale;

    @Column(name = "data_vendita")
    private LocalDate dataVendita;

    @Column(name = "commissione_agenzia", precision = 12, scale = 2)
    private BigDecimal commissioneAgenzia;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pagamento", columnDefinition = "ENUM('bonifico', 'contanti', 'mutuo', 'altro')")
    private MetodoPagamento metodoPagamento;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    public Vendite() {
    }

    public Vendite(Integer immobileId, String acquirenteNome, String acquirenteCognome, 
                   BigDecimal prezzoFinale, LocalDate dataVendita) {
        this.immobileId = immobileId;
        this.acquirenteNome = acquirenteNome;
        this.acquirenteCognome = acquirenteCognome;
        this.prezzoFinale = prezzoFinale;
        this.dataVendita = dataVendita;
    }

    // Getters and Setters
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getImmobileId() {
        return this.immobileId;
    }

    public void setImmobileId(Integer immobileId) {
        this.immobileId = immobileId;
    }

    public String getAcquirenteNome() {
        return this.acquirenteNome;
    }

    public void setAcquirenteNome(String acquirenteNome) {
        this.acquirenteNome = acquirenteNome;
    }

    public String getAcquirenteCognome() {
        return this.acquirenteCognome;
    }

    public void setAcquirenteCognome(String acquirenteCognome) {
        this.acquirenteCognome = acquirenteCognome;
    }

    public String getAcquirenteEmail() {
        return this.acquirenteEmail;
    }

    public void setAcquirenteEmail(String acquirenteEmail) {
        this.acquirenteEmail = acquirenteEmail;
    }

    public BigDecimal getPrezzoFinale() {
        return this.prezzoFinale;
    }

    public void setPrezzoFinale(BigDecimal prezzoFinale) {
        this.prezzoFinale = prezzoFinale;
    }

    public LocalDate getDataVendita() {
        return this.dataVendita;
    }

    public void setDataVendita(LocalDate dataVendita) {
        this.dataVendita = dataVendita;
    }

    public BigDecimal getCommissioneAgenzia() {
        return this.commissioneAgenzia;
    }

    public void setCommissioneAgenzia(BigDecimal commissioneAgenzia) {
        this.commissioneAgenzia = commissioneAgenzia;
    }

    public MetodoPagamento getMetodoPagamento() {
        return this.metodoPagamento;
    }

    public void setMetodoPagamento(MetodoPagamento metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }

    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}