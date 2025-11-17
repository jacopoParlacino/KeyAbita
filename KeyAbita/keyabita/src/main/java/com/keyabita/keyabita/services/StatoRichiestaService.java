package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import com.keyabita.keyabita.model.StatoRichiesta;

public interface StatoRichiestaService {

    Optional<StatoRichiesta> trovaStatoRichiestaConId(int id);

    List<StatoRichiesta> trovaTuttiStatiRichiesta();

    long numeroStatiRichiesta();

}
