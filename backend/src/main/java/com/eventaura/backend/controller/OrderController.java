package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Order;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.OrderRequest;
import com.eventaura.backend.response.PaymentResponse;
import com.eventaura.backend.service.OrderService;
import com.eventaura.backend.service.PaymentService;
import com.eventaura.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

//    @Autowired
//    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req) throws Exception {
        //@RequestHeader("Authorization") String jwt
        //userService.findUserByJwtToken(jwt);
        User user = new User();
        Order order = orderService.createOrder(req, user);
        PaymentResponse response = paymentService.createPaymentLink(order);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = new User(); //userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}
