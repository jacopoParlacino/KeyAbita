package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import com.keyabita.keyabita.model.Richiesta;

public interface RichiestaService {

    List<Richiesta> trovaTutteRichieste();

    Optional<Richiesta> trovaRichiestaConId(int id);

    List<Richiesta> trovaRichiesteConStato(int id);

    Optional<Richiesta> trovaRichiestaConImmobile(int immobileId);

    List<Richiesta> trovaRichiesteConEmail(String email);

    List<Richiesta> trovaRichiesteConNumero(String numero);

}
