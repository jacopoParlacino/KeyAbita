package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.PermessoAgente;
import com.keyabita.keyabita.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermessoAgenteRepository extends JpaRepository<PermessoAgente, Integer> {
    List<PermessoAgente> findByUtente(Utente utente);
    
    Optional<PermessoAgente> findByUtenteAndModulo(Utente utente, String modulo);
    
    List<PermessoAgente> findByUtenteId(Integer utenteId);
}
