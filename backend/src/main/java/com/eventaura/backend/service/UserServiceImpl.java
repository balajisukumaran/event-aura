/**
 * Author: Merin Mary Saju
 */
package com.eventaura.backend.service;

import com.eventaura.backend.entity.USER_ROLE;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.UserRepository;
import com.eventaura.backend.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(String id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (userRequest.getFirstname() != null) {
            user.setFirstname(userRequest.getFirstname());
        }
        if (userRequest.getLastname() != null) {
            user.setLastname(userRequest.getLastname());
        }
        if (userRequest.getEmail() != null) {
            user.setEmail(userRequest.getEmail());
        }
        if (userRequest.getPhone() != null) {
            user.setPhone(userRequest.getPhone());
        }
        if (userRequest.getStatus() != null) {
            user.setStatus(userRequest.getStatus());
        }
        if (userRequest.getImageurl() != null) {
            user.setImageurl(userRequest.getImageurl());
        }
        if (userRequest.getRole() != null) {
            user.setRole(USER_ROLE.getInstance(userRequest.getRole()));
        }

        return userRepository.save(user);
    }


    @Override
    public User disableUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("disabled");
        return userRepository.save(user);
    }


    @Override
    public User activateUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("active");
        return userRepository.save(user);
    }
}
