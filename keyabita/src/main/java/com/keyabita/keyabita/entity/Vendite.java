package com.keyabita.keyabita.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "vendite")
public class Vendite {

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

}
