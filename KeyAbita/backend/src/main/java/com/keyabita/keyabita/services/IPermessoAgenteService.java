package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.PermessoAgente;
import java.util.List;
import java.util.Map;

public interface IPermessoAgenteService {
    
    List<PermessoAgente> getPermessiByAgente(Integer idAgente);
    
    List<PermessoAgente> getPermessiAbilitatiByAgente(Integer idAgente);
    
    List<String> getModuliAbilitatiByAgente(Integer idAgente);
    
    boolean hasPermesso(Integer idAgente, String modulo, String permesso);
    
    PermessoAgente updatePermesso(Integer idAgente, String modulo, String permesso, Boolean abilitato);
    
    List<PermessoAgente> updatePermessiAgente(Integer idAgente, Map<String, Map<String, Boolean>> permessi);
    
    void initializePermessiForAgente(Integer idAgente);
    
    Map<String, Map<String, Boolean>> getPermessiMapByAgente(Integer idAgente);
}