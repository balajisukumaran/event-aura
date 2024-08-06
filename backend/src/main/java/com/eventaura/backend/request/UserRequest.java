package com.eventaura.backend.request;

import com.eventaura.backend.entity.USER_ROLE;
import lombok.Data;

@Data
public class UserRequest {
    String firstname;
    String lastname;
    String email;
    String phone;
    String status;
    String imageurl;
    String role;
}
