package com.keyabita.keyabita.services;

import com.keyabita.keyabita.dto.LoginRequest;
import com.keyabita.keyabita.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
}
