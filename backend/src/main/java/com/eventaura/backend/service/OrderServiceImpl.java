package com.eventaura.backend.service;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.OrderRepository;
import com.eventaura.backend.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public Order createOrder(OrderRequest req, User user) {
        Order order = new Order();
        order.setEventId(req.getEvent_id());
        order.setUserId(req.getUser_id());
        order.setNumTickets(req.getNo_of_tickets());
        order.setTotalAmount(req.getTotal());

        order.setCreatedAt(new Date(System.currentTimeMillis()));
        order.setOrderStatus("pending");
        order = orderRepository.save(order);
        System.out.println("http://localhost:3000/payment/success"+ order.getId());
        return order;
    }

    @Override
    public List<Order> getUsersOrder(String id) {
        return null;
    }
}
