package com.keyabita.keyabita.dto;

import java.time.LocalDate;

/**
 * DTO per ricevere i dati di un immobile e una richiesta insieme
 * e salvarli nel database in una singola richiesta POST
 */
public class ImmobileRichiestaDTO {
    
    // Dati Immobile
    private String indirizzo;
    private String cap;
    private Integer statoImmobileId;
    private Integer metraturId;
    private Integer piano;
    private Integer numeroStanze;
    private Integer numeroBagni;
    private Boolean balcone;
    private Boolean garage;
    private Boolean giardino;
    private Boolean ascensore;
    private Integer annoCostruzione;
    
    // Dati Richiesta
    private String nome;
    private String cognome;
    private String email;
    private String numero;
    private Integer statoRichiestaId;
    private LocalDate data;

    // Getters e Setters
    public String getIndirizzo() { return indirizzo; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
    
    public String getCap() { return cap; }
    public void setCap(String cap) { this.cap = cap; }
    
    public Integer getStatoImmobileId() { return statoImmobileId; }
    public void setStatoImmobileId(Integer statoImmobileId) { this.statoImmobileId = statoImmobileId; }
    
    public Integer getMetraturId() { return metraturId; }
    public void setMetraturId(Integer metraturId) { this.metraturId = metraturId; }
    
    public Integer getPiano() { return piano; }
    public void setPiano(Integer piano) { this.piano = piano; }
    
    public Integer getNumeroStanze() { return numeroStanze; }
    public void setNumeroStanze(Integer numeroStanze) { this.numeroStanze = numeroStanze; }
    
    public Integer getNumeroBagni() { return numeroBagni; }
    public void setNumeroBagni(Integer numeroBagni) { this.numeroBagni = numeroBagni; }
    
    public Boolean getBalcone() { return balcone; }
    public void setBalcone(Boolean balcone) { this.balcone = balcone; }
    
    public Boolean getGarage() { return garage; }
    public void setGarage(Boolean garage) { this.garage = garage; }
    
    public Boolean getGiardino() { return giardino; }
    public void setGiardino(Boolean giardino) { this.giardino = giardino; }
    
    public Boolean getAscensore() { return ascensore; }
    public void setAscensore(Boolean ascensore) { this.ascensore = ascensore; }
    
    public Integer getAnnoCostruzione() { return annoCostruzione; }
    public void setAnnoCostruzione(Integer annoCostruzione) { this.annoCostruzione = annoCostruzione; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    
    public Integer getStatoRichiestaId() { return statoRichiestaId; }
    public void setStatoRichiestaId(Integer statoRichiestaId) { this.statoRichiestaId = statoRichiestaId; }
    
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
}
