package com.eventaura.backend.request;

import lombok.Data;

@Data
public class EventRequest {
    private String organizerId;
    private String eventTitle;
    private String eventDescription;
}
