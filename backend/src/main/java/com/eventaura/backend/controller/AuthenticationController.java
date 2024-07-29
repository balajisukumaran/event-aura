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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private EmailService emailService;
    private final AuthenticationService authenticationService;

    @Value("${allowed.origin}")
    private String allowedOrigin;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest){
        if (authenticationService.userExists(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User exists, please login");
        }
        return ResponseEntity.ok((authenticationService.signup(signupRequest)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        if (!authenticationService.userExists(loginRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User is not registered");
        }
        return ResponseEntity.ok((authenticationService.login(loginRequest)));
    }

    @PostMapping("/get/users")
    public ResponseEntity<String> userByToken(@RequestBody JwtToken jwtToken){
        return ResponseEntity.ok(authenticationService.getUserEmailByToken(jwtToken.getJwtToken()));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        // Check if user exists
        if (!authenticationService.userExists(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Create the reset link
        String resetToken = UUID.randomUUID().toString();
        String resetLink = "http://"+allowedOrigin+"/reset?token=" + resetToken;

        // Send the email
        emailService.sendSimpleMessage(email, "Reset Password", "Click the link to reset your password: " + resetLink);
        return ResponseEntity.ok("Password reset link sent");
    }
}
