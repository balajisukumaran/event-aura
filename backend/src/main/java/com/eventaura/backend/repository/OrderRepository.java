package com.eventaura.backend.repository;

import com.eventaura.backend.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}