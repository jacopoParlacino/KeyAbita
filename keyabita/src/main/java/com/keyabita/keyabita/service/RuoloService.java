
package com.keyabita.keyabita.service;

import java.util.List;
import com.keyabita.keyabita.model.Ruolo;

public interface RuoloService {
    List<Ruolo> getAllRuoli();
    Ruolo getRuoloById(Integer id);
    Ruolo createRuolo(Ruolo ruolo);
    Ruolo updateRuolo(Integer id, Ruolo ruolo);
    void deleteRuolo(Integer id);
}