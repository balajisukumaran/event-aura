package com.eventaura.backend.request;


import lombok.Data;

@Data
public class OrderRequest {

    private String user_id;
    private String event_id;
    private Integer no_of_tickets;
    private Float total;
}
