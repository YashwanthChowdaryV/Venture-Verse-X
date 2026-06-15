package com.ventureverse.ventureverse_api.controllers;

import com.ventureverse.ventureverse_api.dto.request.LoginRequest;
import com.ventureverse.ventureverse_api.dto.response.AuthResponse;
import com.ventureverse.ventureverse_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return userService.login(request);
    }
}