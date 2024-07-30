package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Event;
import com.eventaura.backend.service.EventService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @PostMapping
    // public Event createEvent(@RequestBody Event event) {
    //     return eventService.createEvent(event);
    // }

     @PostMapping(consumes = "multipart/form-data")
    public Event createEvent(
            @RequestPart("event") String eventJson,
            @RequestPart("images") List<MultipartFile> images) throws JsonMappingException, JsonProcessingException {
        Event event = new ObjectMapper().readValue(eventJson, Event.class);
        return eventService.createEvent(event, images);
    }
    // @PutMapping("/{id}")
    // public ResponseEntity<Event> updateEvent(@PathVariable String id,
    //                                          @RequestPart("eventDetails") Event eventDetails,
    //                                          @RequestPart("images") List<MultipartFile> newImages) {
    //     Event updatedEvent = eventService.updateEvent(id, eventDetails, newImages);
    //     return ResponseEntity.ok(updatedEvent);
    // }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestPart("event") Event event, @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        Event updatedEvent = eventService.updateEvent(id, event, images);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
