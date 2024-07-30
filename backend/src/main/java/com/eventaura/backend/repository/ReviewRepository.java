package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

@Repository

public interface ReviewRepository extends MongoRepository<Review, String> {

}
