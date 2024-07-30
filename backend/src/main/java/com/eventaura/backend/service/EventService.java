package com.eventaura.backend.service;

import com.eventaura.backend.entity.Event;

import java.util.List;

public interface EventService {
    List<Event> getEvents();
}
