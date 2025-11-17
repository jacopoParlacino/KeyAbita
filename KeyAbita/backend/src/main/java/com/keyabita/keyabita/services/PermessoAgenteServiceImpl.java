package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.PermessoAgente;
import com.keyabita.keyabita.repos.PermessoAgenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class PermessoAgenteServiceImpl implements IPermessoAgenteService {

    @Autowired
    private PermessoAgenteRepository permessoAgenteRepository;

    // Permessi default per ogni modulo (solo visualizzazione)
    private static final Map<String, List<String>> PERMESSI_DEFAULT = Map.of(
        "dashboard", List.of("visualizza"),
        "valutazioni", List.of("visualizza"),
        "clienti", List.of("visualizza"),
        "contratti", List.of("visualizza")
    );

    @Override
    public List<PermessoAgente> getPermessiByAgente(Integer idAgente) {
        return permessoAgenteRepository.findByIdAgente(idAgente);
    }

    @Override
    public List<PermessoAgente> getPermessiAbilitatiByAgente(Integer idAgente) {
        return permessoAgenteRepository.findPermessiAbilitatiByAgente(idAgente);
    }

    @Override
    public List<String> getModuliAbilitatiByAgente(Integer idAgente) {
        return permessoAgenteRepository.findModuliAbilitatiByAgente(idAgente);
    }

    @Override
    public boolean hasPermesso(Integer idAgente, String modulo, String permesso) {
        Optional<PermessoAgente> permessoOpt = permessoAgenteRepository
            .findByIdAgenteAndModuloAndPermesso(idAgente, modulo, permesso);
        return permessoOpt.isPresent() && permessoOpt.get().getAbilitato();
    }

    @Override
    public PermessoAgente updatePermesso(Integer idAgente, String modulo, String permesso, Boolean abilitato) {
        Optional<PermessoAgente> existingPermesso = permessoAgenteRepository
            .findByIdAgenteAndModuloAndPermesso(idAgente, modulo, permesso);
        
        if (existingPermesso.isPresent()) {
            PermessoAgente p = existingPermesso.get();
            p.setAbilitato(abilitato);
            return permessoAgenteRepository.save(p);
        } else {
            PermessoAgente nuovoPermesso = new PermessoAgente(idAgente, modulo, permesso, abilitato);
            return permessoAgenteRepository.save(nuovoPermesso);
        }
    }

    @Override
    public List<PermessoAgente> updatePermessiAgente(Integer idAgente, Map<String, Map<String, Boolean>> permessi) {
        List<PermessoAgente> result = new ArrayList<>();
        
        for (Map.Entry<String, Map<String, Boolean>> moduloEntry : permessi.entrySet()) {
            String modulo = moduloEntry.getKey();
            Map<String, Boolean> permessiModulo = moduloEntry.getValue();
            
            for (Map.Entry<String, Boolean> permessoEntry : permessiModulo.entrySet()) {
                String permesso = permessoEntry.getKey();
                Boolean abilitato = permessoEntry.getValue();
                
                PermessoAgente p = updatePermesso(idAgente, modulo, permesso, abilitato);
                result.add(p);
            }
        }
        
        return result;
    }

    @Override
    public void initializePermessiForAgente(Integer idAgente) {
        for (Map.Entry<String, List<String>> moduloEntry : PERMESSI_DEFAULT.entrySet()) {
            String modulo = moduloEntry.getKey();
            List<String> permessi = moduloEntry.getValue();
            
            for (String permesso : permessi) {
                Optional<PermessoAgente> existing = permessoAgenteRepository
                    .findByIdAgenteAndModuloAndPermesso(idAgente, modulo, permesso);
                
                if (existing.isEmpty()) {
                    // Abilita solo visualizzazione per default, il resto disabilitato
                    boolean defaultValue = "visualizza".equals(permesso);
                    PermessoAgente nuovoPermesso = new PermessoAgente(idAgente, modulo, permesso, defaultValue);
                    permessoAgenteRepository.save(nuovoPermesso);
                }
            }
        }
    }

    @Override
    public Map<String, Map<String, Boolean>> getPermessiMapByAgente(Integer idAgente) {
        List<PermessoAgente> permessi = getPermessiByAgente(idAgente);
        Map<String, Map<String, Boolean>> result = new HashMap<>();
        
        // Inizializza con i permessi default
        for (String modulo : PERMESSI_DEFAULT.keySet()) {
            result.put(modulo, new HashMap<>());
            for (String permesso : PERMESSI_DEFAULT.get(modulo)) {
                result.get(modulo).put(permesso, false);
            }
        }
        
        // Sovrascrive con i valori dal database
        for (PermessoAgente permesso : permessi) {
            result.computeIfAbsent(permesso.getModulo(), k -> new HashMap<>())
                  .put(permesso.getPermesso(), permesso.getAbilitato());
        }
        
        return result;
    }
}