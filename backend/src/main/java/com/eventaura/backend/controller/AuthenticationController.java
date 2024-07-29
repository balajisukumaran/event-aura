package com.eventaura.backend.controller;

import com.eventaura.backend.request.AuthenticationRequest;
import com.eventaura.backend.request.SignupRequest;
import com.eventaura.backend.response.AuthenticationResponse;
import com.eventaura.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/test")
    public ResponseEntity<String> myTest(){
        return ResponseEntity.ok("Test is working.");
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signup(@RequestBody SignupRequest signupRequest){
        return ResponseEntity.ok((authenticationService.signup(signupRequest)));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest){
        return ResponseEntity.ok((authenticationService.authenticate(authenticationRequest)));
    }
}
