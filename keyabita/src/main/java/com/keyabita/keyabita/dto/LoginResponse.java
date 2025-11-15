package com.keyabita.keyabita.dto;

import com.keyabita.keyabita.model.Utente;

public class LoginResponse {
    private boolean success;
    private String message;
    private Utente utente;
    private String token;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message, Utente utente, String token) {
        this.success = success;
        this.message = message;
        this.utente = utente;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
