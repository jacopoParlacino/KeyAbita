package com.keyabita.keyabita.services;

import com.keyabita.keyabita.model.Utente;
import com.keyabita.keyabita.dto.LoginRequest;
import com.keyabita.keyabita.dto.LoginResponse;
import com.keyabita.keyabita.repos.UtenteRepo;
import com.keyabita.keyabita.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UtenteRepo utenteRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // Verifica che email e password siano presenti
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
            loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return new LoginResponse(false, "Email e password sono obbligatori", null, null);
        }

        // Cerca l'utente per email
        Optional<Utente> utenteOpt = utenteRepo.findByEmail(loginRequest.getEmail());

        if (utenteOpt.isEmpty()) {
            return new LoginResponse(false, "Utente non trovato", null, null);
        }

        Utente utente = utenteOpt.get();

        // Confronta la password usando BCrypt
        if (passwordEncoder.matches(loginRequest.getPassword(), utente.getPassword())) {
            // Genera il token JWT
            String token = jwtUtil.generateToken(utente.getEmail(), utente.getRuolo().getNome());
            return new LoginResponse(true, "Login successful", utente, token);
        } else {
            return new LoginResponse(false, "Password non corretta", null, null);
        }
    }
}
