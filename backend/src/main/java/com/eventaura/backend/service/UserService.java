package com.eventaura.backend.service;

import com.eventaura.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(String id);
    User createUser(User user);
    void deleteUser(String id);
    User updateUser(String id, User userDetails);
    User disableUser(String id);

    User activateUser(String id);
}
