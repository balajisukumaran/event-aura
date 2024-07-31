/**
 * Author: Sruthi Shaji
 */
package com.eventaura.backend.service;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.OrderRepository;
import com.eventaura.backend.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    static SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

    @Override
    public Order createOrder(OrderRequest req, User user) {
        Order order = new Order();
        order.setEvent(req.getEvent());
        order.setUserId(req.getUser_id());
        order.setNumTickets(req.getNo_of_tickets());
        order.setTotalAmount(req.getTotal());

        Date now = new Date(System.currentTimeMillis());
        String formattedDate = sdf.format(now);
        order.setCreatedAt(formattedDate);
        order.setOrderStatus("pending");
        order = orderRepository.save(order);
        System.out.println("http://localhost:3000/payment/success"+ order.getId());
        return order;
    }

    public void confirmOrder(String orderId) {
        Order order= orderRepository.findById(orderId).get();
        order.setOrderStatus("confirm");
        orderRepository.save(order);
    }

    public void declineOrder(String orderId) {
        Order order= orderRepository.findById(orderId).get();
        order.setOrderStatus("decline");
        orderRepository.save(order);
    }

    @Override
    public void cancelOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUsersOrder(String id) {
        return orderRepository.getOrdersByUserId(id);
    }
}
