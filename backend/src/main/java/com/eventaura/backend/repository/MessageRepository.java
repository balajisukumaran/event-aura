package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
