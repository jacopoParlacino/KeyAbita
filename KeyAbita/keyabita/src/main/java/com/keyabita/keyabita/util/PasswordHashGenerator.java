package com.keyabita.keyabita.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class per generare password hashate con BCrypt
 * Esegui questo main per generare gli hash delle password
 */
public class PasswordHashGenerator {
    
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Password di test
        String password = "password123";
        
        System.out.println("Password in chiaro: " + password);
        System.out.println("\nHash BCrypt generati:");
        System.out.println("Mario:  " + encoder.encode(password));
        System.out.println("Laura:  " + encoder.encode(password));
        System.out.println("Paolo:  " + encoder.encode(password));
        System.out.println("Giulia: " + encoder.encode(password));
    }
}
