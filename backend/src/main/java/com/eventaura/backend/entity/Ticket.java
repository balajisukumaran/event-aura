/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.entity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String name;
    private String orderId;
    private String customerId;
    private TICKET_STATUS status;
    private String adminId;
    private List<Message> messages = new ArrayList<>();
}