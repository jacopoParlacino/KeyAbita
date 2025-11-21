package com.keyabita.keyabita.model;

import jakarta.persistence.*;

@Entity
@Table(name = "permessi_agenti")
public class PermessoAgente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utente", referencedColumnName = "id")
    private Utente utente;

    @Column(name = "modulo", nullable = false)
    private String modulo;

    @Column(name = "visualizza", nullable = false)
    private Boolean visualizza = false;

    @Column(name = "creare", nullable = false)
    private Boolean creare = false;

    @Column(name = "modificare", nullable = false)
    private Boolean modificare = false;

    @Column(name = "eliminare", nullable = false)
    private Boolean eliminare = false;

    // Costruttori
    public PermessoAgente() {}

    public PermessoAgente(Utente utente, String modulo) {
        this.utente = utente;
        this.modulo = modulo;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public Boolean getVisualizza() {
        return visualizza;
    }

    public void setVisualizza(Boolean visualizza) {
        this.visualizza = visualizza;
    }

    public Boolean getCreare() {
        return creare;
    }

    public void setCreare(Boolean creare) {
        this.creare = creare;
    }

    public Boolean getModificare() {
        return modificare;
    }

    public void setModificare(Boolean modificare) {
        this.modificare = modificare;
    }

    public Boolean getEliminare() {
        return eliminare;
    }

    public void setEliminare(Boolean eliminare) {
        this.eliminare = eliminare;
    }
}
