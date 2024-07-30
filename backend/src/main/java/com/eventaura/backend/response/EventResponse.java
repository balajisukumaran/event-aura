package com.eventaura.backend.response;

import com.eventaura.backend.entity.Event;

public class EventResponse {
    private String message;
    private Event event;

    public EventResponse(String message, Event event) {
        this.message = message;
        this.event = event;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
