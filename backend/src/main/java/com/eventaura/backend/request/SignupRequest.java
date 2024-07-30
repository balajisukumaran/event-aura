package com.eventaura.backend.request;

import com.eventaura.backend.entity.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    private USER_ROLE role;
    private String status;
    private String imageurl;
}
