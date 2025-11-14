// Configurazione Spring Security

package com.keyabita.keyabita.config;

import com.keyabita.keyabita.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Disabilita CSRF per API REST stateless
                .csrf(csrf -> csrf.disable())
                // Configura sessione stateless (usa JWT)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                // Configura l'autorizzazione degli endpoint
                .authorizeHttpRequests(authz -> authz
                        // Endpoint pubblici
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        // Endpoint protetti - solo ADMIN
                        .requestMatchers("/api/utenti/**").hasRole("ADMIN")
                        .requestMatchers("/api/ruoli/**").hasRole("ADMIN")
                        // Endpoint protetti - ADMIN e AGENT
                        .requestMatchers("/api/immobili/**").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers("/api/valutazioni/**").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers("/api/richieste/**").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers("/api/contratti/**").hasAnyRole("ADMIN", "AGENT")
                        // Endpoint protetti - tutti gli utenti autenticati
                        .requestMatchers("/api/citta/**").authenticated()
                        .requestMatchers("/api/stati-immobili/**").authenticated()
                        .requestMatchers("/api/stati-contratti/**").authenticated()
                        .requestMatchers("/api/stati-richieste/**").authenticated()
                        // Tutti gli altri endpoint richiedono autenticazione
                        .anyRequest().authenticated()
                )
                // Aggiungi il filtro JWT prima del filtro di autenticazione standard
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Permetti frame per H2 console
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
