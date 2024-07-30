package com.eventaura.backend.service;

import com.eventaura.backend.entity.Event;
import com.eventaura.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;


    @Override
    public List<Event> getEvents() {
        List<Event> events = eventRepository.findAll();
        return events;
    }

    @Override
    public List<Event> getEventsByOrganizerId(String organizerId) {
        List<Event> events = eventRepository.getEventsByOrganizerId(organizerId);
        return events;
    }

}
