package com.eventaura.backend.service;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.OrderRequest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest req, User user);

    List<Order> getUsersOrder(String id);
}
