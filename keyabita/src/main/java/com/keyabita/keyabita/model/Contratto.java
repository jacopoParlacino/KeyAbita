package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "contratti")
public class Contratto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "inizio_contratto")
    private LocalDate inizioContratto;

    @Column(name = "fine_contratto")
    private LocalDate fineContratto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_richiesta", referencedColumnName = "id")
    private Richiesta richiesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stato_contratto", referencedColumnName = "id")
    private StatoContratto statoContratto;


}
