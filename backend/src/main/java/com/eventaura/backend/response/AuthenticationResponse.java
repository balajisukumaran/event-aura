package com.eventaura.backend.response;

import com.eventaura.backend.entity.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String email;
    private USER_ROLE role;
    private String id;
}
