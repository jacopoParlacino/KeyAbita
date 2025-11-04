package com.keyabita.keyabita.model;

// Modello che rappresenta un immobile da valutare o vendere.
// I campi rispecchiano la struttura della tabella 'immobili' nel database.

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "immobili")
public class Immobile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identificativo univoco
    
    @Column(name = "proprietario_id", nullable = false)
    private int proprietarioId; // ID del proprietario (FK verso utenti)
    
    private String indirizzo; // Indirizzo dell'immobile
    
    @ManyToOne
    @JoinColumn(name = "citta", nullable = false)
    private Citta citta; // Città (FK)
    
    @ManyToOne
    @JoinColumn(name = "stato_immobile", nullable = false)
    private StatoImmobile statoImmobile; // Condizione dell'immobile (FK)
    
    @Column(name = "metri_quadri")
    private Double metriQuadri; // Superficie in metri quadri
    
    @Column(name = "numero_stanze")
    private Integer numeroStanze; // Numero di stanze
    
    @Column(name = "numero_bagni")
    private Integer numeroBagni; // Numero di bagni
    
    private Integer piano; // Piano dell'immobile
    
    private Boolean balcone = false; // Presenza balcone
    private Boolean garage = false; // Presenza garage
    private Boolean giardino = false; // Presenza giardino
    
    @Column(name = "anno_costruzione")
    private Integer annoCostruzione; // Anno di costruzione
    
    @Column(name = "prezzo_richiesto")
    private Double prezzoRichiesto; // Prezzo richiesto dal proprietario
    
    @Column(name = "valutazione_stimata")
    private Double valutazioneStimata; // Valutazione stimata
    
    @Column(name = "stato_pratica")
    private String statoPratica = "in_attesa"; // Stato della pratica
    
    @Column(name = "data_creazione")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCreazione = new Date(); // Data di creazione record

    // Enum per lo stato dell'immobile
    public enum StatoImmobile {
        NUOVO("nuovo"),
        BUONO("buono"),
        DA_RISTRUTTURARE("da_ristrutturare");

        private final String valore;

        StatoImmobile(String valore) {
            this.valore = valore;
        }

        public String getValore() {
            return valore;
        }

        public static StatoImmobile fromString(String value) {
            value = value.toLowerCase();
            if (value.equals("nuovo")) return NUOVO;
            if (value.equals("buono")) return BUONO;
            if (value.equals("da_ristrutturare")) return DA_RISTRUTTURARE;
            throw new IllegalArgumentException("Valore StatoImmobile non valido: " + value);
        }
    }

    // Enum per lo stato della pratica
    public enum StatoPratica {
        IN_ATTESA("in_attesa"),
        VALUTATO("valutato"),
        IN_CONTRATTO("in_contratto"),
        VENDUTO("venduto");

        private final String valore;

        StatoPratica(String valore) {
            this.valore = valore;
        }

        public String getValore() {
            return valore;
        }

        public static StatoPratica fromString(String value) {
            value = value.toLowerCase();
            if (value.equals("in_attesa")) return IN_ATTESA;
            if (value.equals("valutato")) return VALUTATO;
            if (value.equals("in_contratto")) return IN_CONTRATTO;
            if (value.equals("venduto")) return VENDUTO;
            throw new IllegalArgumentException("Valore StatoPratica non valido: " + value);
        }
    }

    // Getter e Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getProprietarioId() { return proprietarioId; }
    public void setProprietarioId(int proprietarioId) { this.proprietarioId = proprietarioId; }
    
    public String getIndirizzo() { return indirizzo; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
    
    public Citta getCitta() { return citta; }
    public void setCitta(Citta citta) { this.citta = citta; }
    
    public StatoImmobile getStatoImmobile() { return statoImmobile; }
    public void setStatoImmobile(StatoImmobile statoImmobile) { this.statoImmobile = statoImmobile; }
    
    public Double getMetriQuadri() { return metriQuadri; }
    public void setMetriQuadri(Double metriQuadri) { this.metriQuadri = metriQuadri; }
    
    public Integer getNumeroStanze() { return numeroStanze; }
    public void setNumeroStanze(Integer numeroStanze) { this.numeroStanze = numeroStanze; }
    
    public Integer getNumeroBagni() { return numeroBagni; }
    public void setNumeroBagni(Integer numeroBagni) { this.numeroBagni = numeroBagni; }
    
    public Integer getPiano() { return piano; }
    public void setPiano(Integer piano) { this.piano = piano; }
    
    public Boolean getBalcone() { return balcone; }
    public void setBalcone(Boolean balcone) { this.balcone = balcone; }
    
    public Boolean getGarage() { return garage; }
    public void setGarage(Boolean garage) { this.garage = garage; }
    
    public Boolean getGiardino() { return giardino; }
    public void setGiardino(Boolean giardino) { this.giardino = giardino; }
    
    public Integer getAnnoCostruzione() { return annoCostruzione; }
    public void setAnnoCostruzione(Integer annoCostruzione) { this.annoCostruzione = annoCostruzione; }
    
    public Double getPrezzoRichiesto() { return prezzoRichiesto; }
    public void setPrezzoRichiesto(Double prezzoRichiesto) { this.prezzoRichiesto = prezzoRichiesto; }
    
    public Double getValutazioneStimata() { return valutazioneStimata; }
    public void setValutazioneStimata(Double valutazioneStimata) { this.valutazioneStimata = valutazioneStimata; }
    
    public String getStatoPratica() { return statoPratica; }
    public void setStatoPratica(String statoPratica) { this.statoPratica = statoPratica; }
    
    public Date getDataCreazione() { return dataCreazione; }
    public void setDataCreazione(Date dataCreazione) { this.dataCreazione = dataCreazione; }
}
