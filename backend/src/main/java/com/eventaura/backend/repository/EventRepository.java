package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> getEventsByOrganizerId(String organizerId);
}
