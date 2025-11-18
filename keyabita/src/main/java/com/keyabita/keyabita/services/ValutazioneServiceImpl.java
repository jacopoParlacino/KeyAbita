package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Valutazione;
import com.keyabita.keyabita.model.Immobile;
import com.keyabita.keyabita.repos.ValutazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ValutazioneServiceImpl implements IValutazioneService {

    @Autowired
    private ValutazioneRepository valutazioneRepository;

    @Override
    public List<Valutazione> getAllValutazioni() {
        return valutazioneRepository.findAll();
    }

    @Override
    public Optional<Valutazione> getValutazioneById(Integer id) {
        return valutazioneRepository.findById(id);
    }

    @Override
    public List<Valutazione> getValutazioniByImmobile(Immobile immobile) {
        return valutazioneRepository.findByImmobile(immobile);
    }

    @Override
    public List<Valutazione> getValutazioniByRange(Integer min, Integer max) {
        return valutazioneRepository.findByValoreStimatoBetween(min, max);
    }

    @Override
    public Valutazione saveValutazione(Valutazione valutazione) {
        return valutazioneRepository.save(valutazione);
    }

    @Override
    public void deleteValutazione(Integer id) {
        valutazioneRepository.deleteById(id);
    }
}