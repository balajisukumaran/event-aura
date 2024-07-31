/**
 * Author: Merin Mary Saju
 */
package com.eventaura.backend.service;

import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.UserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(String id);
    User createUser(User user);
    void deleteUser(String id);
    User updateUser(String id, UserRequest userRequest);
    User disableUser(String id);

    User activateUser(String id);
}
