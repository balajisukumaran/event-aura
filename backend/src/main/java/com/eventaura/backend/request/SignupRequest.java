package com.eventaura.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    private String password;
    private String user_type;
    private String status;
    private String image_url;
}
