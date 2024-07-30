package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository

public interface ReviewRepository extends MongoRepository<Review, String> {


    public List<Review> findAllByEventId(String event_id);
}
