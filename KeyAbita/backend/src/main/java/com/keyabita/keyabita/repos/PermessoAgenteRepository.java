package com.keyabita.keyabita.repos;

import com.keyabita.keyabita.model.PermessoAgente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermessoAgenteRepository extends JpaRepository<PermessoAgente, Integer> {
    
    List<PermessoAgente> findByIdAgente(Integer idAgente);
    
    List<PermessoAgente> findByIdAgenteAndModulo(Integer idAgente, String modulo);
    
    Optional<PermessoAgente> findByIdAgenteAndModuloAndPermesso(Integer idAgente, String modulo, String permesso);
    
    @Query("SELECT p FROM PermessoAgente p WHERE p.idAgente = :idAgente AND p.abilitato = true")
    List<PermessoAgente> findPermessiAbilitatiByAgente(@Param("idAgente") Integer idAgente);
    
    @Query("SELECT DISTINCT p.modulo FROM PermessoAgente p WHERE p.idAgente = :idAgente AND p.abilitato = true")
    List<String> findModuliAbilitatiByAgente(@Param("idAgente") Integer idAgente);
    
    void deleteByIdAgente(Integer idAgente);
}