package com.keyabita.keyabita.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "permessi_agenti")
public class PermessoAgente implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "id_agente")
    private Integer idAgente;
    
    private String modulo;
    private String permesso;
    private Boolean abilitato;
    
    @Column(name = "data_creazione")
    private LocalDate dataCreazione;
    
    @Column(name = "data_modifica")
    private LocalDate dataModifica;

    // Costruttori
    public PermessoAgente() {}

    public PermessoAgente(Integer idAgente, String modulo, String permesso, Boolean abilitato) {
        this.idAgente = idAgente;
        this.modulo = modulo;
        this.permesso = permesso;
        this.abilitato = abilitato;
        this.dataCreazione = LocalDate.now();
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdAgente() {
        return idAgente;
    }

    public void setIdAgente(Integer idAgente) {
        this.idAgente = idAgente;
    }

    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public String getPermesso() {
        return permesso;
    }

    public void setPermesso(String permesso) {
        this.permesso = permesso;
    }

    public Boolean getAbilitato() {
        return abilitato;
    }

    public void setAbilitato(Boolean abilitato) {
        this.abilitato = abilitato;
        this.dataModifica = LocalDate.now();
    }

    public LocalDate getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDate dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public LocalDate getDataModifica() {
        return dataModifica;
    }

    public void setDataModifica(LocalDate dataModifica) {
        this.dataModifica = dataModifica;
    }
}