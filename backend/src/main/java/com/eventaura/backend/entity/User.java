package com.eventaura.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String status;
    private String imageurl;
    private USER_ROLE role;
    private int no_of_followers = 0;
}
