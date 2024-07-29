package com.eventaura.backend.controller;

import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("{id}")
    public ResponseEntity<Object> getUser(@PathVariable String id) {
        try
        {
            User user = userRepository.findById(id).get();
            return new ResponseEntity(user, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity("Error while fetching user. ", HttpStatus.BAD_REQUEST);

        }
    }
}
