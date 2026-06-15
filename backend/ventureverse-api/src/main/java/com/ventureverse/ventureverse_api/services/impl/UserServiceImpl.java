package com.ventureverse.ventureverse_api.services.impl;
import com.ventureverse.ventureverse_api.security.SecurityUtils;
import com.ventureverse.ventureverse_api.dto.request.LoginRequest;
import com.ventureverse.ventureverse_api.security.SecurityUtils;
import com.ventureverse.ventureverse_api.dto.request.UserCreateRequest;
import com.ventureverse.ventureverse_api.dto.response.AuthResponse;
import com.ventureverse.ventureverse_api.dto.response.UserResponse;
import com.ventureverse.ventureverse_api.entities.User;
import com.ventureverse.ventureverse_api.repositories.UserRepository;
import com.ventureverse.ventureverse_api.security.JwtService;
import com.ventureverse.ventureverse_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public UserResponse createUser(UserCreateRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .build();
    }
    @Override
public UserResponse getCurrentUser() {

    String email =
            SecurityUtils.getCurrentUserEmail();

    User user =
            userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"));

    return UserResponse.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .email(user.getEmail())
            .build();
}
    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid credentials"));

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }
}