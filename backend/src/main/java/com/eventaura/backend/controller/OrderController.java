package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.OrderRequest;
import com.eventaura.backend.response.PaymentResponse;
import com.eventaura.backend.service.OrderService;
import com.eventaura.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req) {
        try
        {
            User user = new User();
            Order order = orderService.createOrder(req, user);
            PaymentResponse response = paymentService.createPaymentLink(order);
            return new ResponseEntity(response, HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity("Error while order creation.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<String> confirmOrder(@PathVariable("id") String orderId) {
        try {
            orderService.confirmOrder(orderId);
            return new ResponseEntity("Order confirmed.", HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity("Error while order confirmation.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/decline/{id}")
    public ResponseEntity<String> declineOrder (@PathVariable("id") String orderId) {
        try {
            orderService.declineOrder(orderId);
            return new ResponseEntity("Order declined.", HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity("Error while order decline.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable("id") String orderId) {
        try {
            orderService.cancelOrder(orderId);
            return new ResponseEntity("Order cancelled.", HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity("Error while order cancel.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = new User();
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}
