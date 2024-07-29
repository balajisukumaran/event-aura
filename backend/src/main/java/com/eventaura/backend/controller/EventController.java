package com.eventaura.backend.controller;

import com.eventaura.backend.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import com.eventaura.backend.repository.Event;

import java.util.List;

@RestController
public class EventController {

    @PostMapping(path="/create", produces = "application/json")
    public Object processRequest(@RequestBody Event requestBody )
    {
        return null;
    }

    @GetMapping(path = "/events", produces = "application/json")
    public List<Event> getEventsByUserId(@RequestParam String userId) {
        return EventRepository.findAllByUserId(userId);
    }
}
