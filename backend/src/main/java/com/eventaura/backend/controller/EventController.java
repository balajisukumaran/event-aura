package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Event;
import com.eventaura.backend.repository.EventRepository;
import com.eventaura.backend.response.EventResponse;
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
import java.util.Map;


@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;
    private EventRepository eventRepository;
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

     @GetMapping(path = "/user", produces = "application/json")
     public ResponseEntity<Object> getEventsByUserId(@RequestParam String userId) {
         try{
             List<Event> events = eventService.getEventsByOrganizerId(userId);
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

    @PostMapping(consumes = "multipart/form-data")
    public EventResponse createEvent(
            @RequestPart("event") String eventJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws JsonMappingException, JsonProcessingException {
        Event event = new ObjectMapper().readValue(eventJson, Event.class);
        Event createdEvent = eventService.createEvent(event, images);
        return new EventResponse("Event created successfully", createdEvent);
    }

    @PutMapping("/{id}")
    public EventResponse updateEvent(
            @PathVariable String id, 
            @RequestPart("event") String eventJson, 
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws JsonMappingException, JsonProcessingException {
        Event event = new ObjectMapper().readValue(eventJson, Event.class);
        Event updatedEvent = eventService.updateEvent(id, event, images);
        return new EventResponse("Event updated successfully", updatedEvent);
    }

    @PutMapping("/{id}/approve-reject")
    public EventResponse approveRejectEvent(
            @PathVariable String id,
            @RequestBody Map<String, Object> request) {
        boolean isApproved = (boolean) request.get("isApproved");
        String comments = (String) request.get("comments");
        Event updatedEvent = eventService.approveEvent(id, comments, isApproved);
        return new EventResponse("Event updated successfully", updatedEvent);
    }

    @DeleteMapping("/{id}")
    public EventResponse deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return new EventResponse("Event deleted successfully", null);
    }
}
