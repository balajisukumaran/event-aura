/**
 * Authors : Nikita Davies, Sruthi Shaji
 */
package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {
}
