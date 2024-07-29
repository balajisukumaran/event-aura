package com.eventaura.backend.service;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.OrderRequest;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest req, User user);

    void confirmOrder(String orderId);

    void declineOrder(String orderId);

    void cancelOrder(String orderId);

    List<Order> getUsersOrder(String id);
}
