package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import com.keyabita.keyabita.model.StatoContratto;

public interface StatoContrattoService {

    List<StatoContratto> trovaTuttiStatoContratto();

    Optional<StatoContratto> trovaTuttiStatoContrattoConId(int id);

}
