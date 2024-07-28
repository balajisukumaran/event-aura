package com.eventaura.backend.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;

    private String userId;
    private String eventId;
    private Integer numTickets;
    private String orderStatus;
    private Date createdAt;
    private Float totalAmount;


//    private Payment payment;
}
