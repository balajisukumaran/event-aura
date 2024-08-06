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
    public User getUserByEmail(String email) {
        Optional<User> user =  userRepository.findByEmail(email);
        if(user.isPresent()) {
            return user.get();
        }
        return null;
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
        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setPhone(userRequest.getPhone());
        user.setStatus(userRequest.getStatus());
        user.setImageurl(userRequest.getImageurl());
        user.setRole(USER_ROLE.getInstance(userRequest.getRole()));
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
