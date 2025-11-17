package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Valutazione;
import com.keyabita.keyabita.model.Immobile;
import java.util.List;
import java.util.Optional;

public interface IValutazioneService {
    List<Valutazione> getAllValutazioni();
    Optional<Valutazione> getValutazioneById(Integer id);
    List<Valutazione> getValutazioniByImmobile(Immobile immobile);
    List<Valutazione> getValutazioniByRange(Integer min, Integer max);
    List<Valutazione> getValutazioniByCity(String nomeCitta);
    List<Valutazione> getValutazioniRecenti(int numero);
    Valutazione saveValutazione(Valutazione valutazione);
    void deleteValutazione(Integer id);
}