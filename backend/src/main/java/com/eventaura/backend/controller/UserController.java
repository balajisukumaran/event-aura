/**
 * Authors: Merin Mary Saju
 */

package com.eventaura.backend.controller;

import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.UserRequest;
import com.eventaura.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody UserRequest userRequest) {
        return userService.updateUser(id, userRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}/disable")
    public User disableUser(@PathVariable String id) {
        return userService.disableUser(id);
    }

    @PutMapping("/{id}/activate")
    public User activateUser(@PathVariable String id) {
        return userService.activateUser(id);
    }
}
