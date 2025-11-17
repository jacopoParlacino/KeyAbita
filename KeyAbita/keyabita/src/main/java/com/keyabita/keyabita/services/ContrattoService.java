package com.keyabita.keyabita.services;

import java.util.List;
import java.util.Optional;

import com.keyabita.keyabita.model.Contratto;

public interface ContrattoService {

    List<Contratto> trovaTuttiContratti();

    Optional<Contratto> trovaContrattoConId(int id);

}
