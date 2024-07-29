package com.eventaura.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    private Float rating;
    private String comment;

    private User added_user;
}
