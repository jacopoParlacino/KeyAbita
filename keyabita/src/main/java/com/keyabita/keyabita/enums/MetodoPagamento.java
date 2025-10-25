package com.keyabita.keyabita.enums;

// 'bonifico', 'contanti', 'mutuo', 'altro'

public enum MetodoPagamento {

    BONIFICO("Bonifico"),
    CONTANTI("Contanti"),
    MUTUO("Mutuo"),
    ALTRO("Altro");

    private String descrizione;

    MetodoPagamento(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getDescrizione() {
        return descrizione;
    }
}
