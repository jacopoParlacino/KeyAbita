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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

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
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Abilita CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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
                        .requestMatchers("/api/utenti/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/ruoli/**").permitAll() // Permesso temporaneamente per test
                        // Endpoint protetti - ADMIN e AGENT
                        .requestMatchers("/api/immobili/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/valutazioni/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/richieste/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/contratti/**").permitAll() // Permesso temporaneamente per test
                        // Endpoint protetti - tutti gli utenti autenticati
                        .requestMatchers("/api/citta/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/stati-immobili/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/stati-contratti/**").permitAll() // Permesso temporaneamente per test
                        .requestMatchers("/api/stati-richieste/**").permitAll() // Permesso temporaneamente per test
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
