package com.eventaura.backend.controller;

import com.eventaura.backend.entity.JwtToken;
import com.eventaura.backend.request.LoginRequest;
import com.eventaura.backend.request.SignupRequest;
import com.eventaura.backend.response.AuthenticationResponse;
import com.eventaura.backend.service.AuthenticationService;
import com.eventaura.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.Random;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private EmailService emailService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @Value("${allowed.origin}")
    private String allowedOrigin;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest){
        if (authenticationService.userExists(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User exists");
        }
        return ResponseEntity.ok((authenticationService.signup(signupRequest)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        if (!authenticationService.userExists(loginRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User is not registered");
        }
        if (!authenticationService.validatePassword(loginRequest.getEmail(), loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Incorrect password");
        }
        return ResponseEntity.ok((authenticationService.login(loginRequest)));
    }

    @PostMapping("/get/users")
    public ResponseEntity<String> userByToken(@RequestBody JwtToken jwtToken){
        return ResponseEntity.ok(authenticationService.getUserEmailByToken(jwtToken.getJwtToken()));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String resetToken = payload.get("resetToken");

        // Check if user exists
        if (!authenticationService.userExists(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Send the email
        emailService.sendSimpleMessage(email, "Reset Password", "Please use this token to reset your password: " + resetToken);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("password");

        // Encode the new password
        String encodedPassword = passwordEncoder.encode(newPassword);

        // Update the user's password in the database
        authenticationService.updatePassword(email, encodedPassword);
        // Send the email
        emailService.sendSimpleMessage(email, "Password Reset Successful", "Your password has been reset successfully");
        return ResponseEntity.ok(true);
    }
}
