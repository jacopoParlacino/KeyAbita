package com.keyabita.keyabita.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Disabilita l'autenticazione HTTP Basic
                .httpBasic(basic -> basic.disable())
                // Disabilita CSRF per API REST (da valutare in produzione)
                .csrf(csrf -> csrf.disable())
                // Configura l'autorizzazione degli endpoint
                .authorizeHttpRequests(authz -> authz
                        // Permette accesso pubblico a tutti gli endpoint
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
