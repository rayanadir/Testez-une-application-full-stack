package com.openclassrooms.starterjwt.controller;

import com.openclassrooms.starterjwt.controllers.AuthController;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.response.JwtResponse;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @BeforeEach
    public void setUp() {
        authController = new AuthController(
                authenticationManager,
                passwordEncoder,
                jwtUtils,
                userRepository
        );
    }

    @Test
    @DisplayName("authenticateUser method, return JWT response")
    void whenUserAuthenticated_thenReturnJwtResponse(){
        LoginRequest loginRequest = new LoginRequest();
        String email = "toto3toto.com";
        String password = "test!1234";

        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        String token = "generated_token";

        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(4L)
                .username(email)
                .lastName("toto")
                .firstName("toto")
                .admin(false)
                .password(password)
                .build();

        User user = new User();
        user.setAdmin(false);
        boolean isAdmin = user.isAdmin();

        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password))).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);
        securityContext.setAuthentication(authentication);

        when(jwtUtils.generateJwtToken(authentication)).thenReturn(token);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userRepository.findByEmail(userDetails.getUsername())).thenReturn(Optional.of(user));

        JwtResponse jwtResponse = new JwtResponse(
                token,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                isAdmin
        );

        ResponseEntity<?> authenticateUser = authController.authenticateUser(loginRequest);
        ResponseEntity<?> responseEntityOK = ResponseEntity.ok(jwtResponse);

        assertEquals(authenticateUser.getStatusCode(),responseEntityOK.getStatusCode());
        verify(authenticationManager, times(1)).authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        verify(jwtUtils, times(1)).generateJwtToken(authentication);
        verify(userRepository, times(1)).findByEmail(userDetails.getUsername());
    }


}
