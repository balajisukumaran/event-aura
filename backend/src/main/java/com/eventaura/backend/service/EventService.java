/**
 * Author : Nikita Davies
 */

package com.eventaura.backend.service;

import com.eventaura.backend.entity.Event;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

public interface EventService {
    List<Event> getEvents();

    List<Event> getEventsByOrganizerId(String organizerId);
    Optional<Event> getEventById(String id);
    Event createEvent(Event event, List<MultipartFile> images);
    void deleteEvent(String id);
    Event updateEvent(String id, Event eventDetails, List<MultipartFile> newImages);
}
