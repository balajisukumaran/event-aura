package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Event;
import com.eventaura.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {


    @Autowired
    private EventService eventService;
    @GetMapping(path = "/", produces = "application/json")
    public ResponseEntity<Object> getEvents() {
        try{
            List<Event> events = eventService.getEvents();
            return new ResponseEntity(events, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity("Error while fetching events.", HttpStatus.BAD_REQUEST);
        }
    }
}
