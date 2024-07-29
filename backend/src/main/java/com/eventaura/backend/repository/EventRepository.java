package com.eventaura.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    static List<Event> findAllByUserId(String userId);
}
