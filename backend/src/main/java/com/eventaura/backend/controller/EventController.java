package com.eventaura.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventaura.backend.repository.Event;

@RestController
public class EventController {

    @PostMapping(path="/create", produces = "application/json")
    public Object processRequest(@RequestBody Event requestBody )
    {
        return null;
    }
}
