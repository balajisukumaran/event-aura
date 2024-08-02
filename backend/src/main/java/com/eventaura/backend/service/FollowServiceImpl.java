package com.eventaura.backend.service;

import com.eventaura.backend.entity.USER_ROLE;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    private UserRepository userRepository;

    public String followOrganizer(String followerId, String organizerId) {
        Optional<User> followerOpt = userRepository.findById(followerId);
        Optional<User> organizerOpt = userRepository.findById(organizerId);

        if (followerOpt.isEmpty() || organizerOpt.isEmpty()) {
            return "User or Organizer not found";
        }

        User follower = followerOpt.get();
        User organizer = organizerOpt.get();

        if (organizer.getRole() != USER_ROLE.ORGANIZER) {
            return "The user is not an organizer";
        }

        if (organizer.getFollowers().contains(followerId)) {
            return "Already following";
        }

        organizer.addFollower(followerId);
        userRepository.save(organizer);

        return "Followed successfully";
    }

    public boolean isFollowing(String userId, String organizerId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<User> organizerOpt = userRepository.findById(organizerId);

        if (userOpt.isEmpty() || organizerOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        User organizer = organizerOpt.get();

        return organizer.getFollowers().contains(userId);
    }

    public String unfollowOrganizer(String followerId, String organizerId) {
        Optional<User> followerOpt = userRepository.findById(followerId);
        Optional<User> organizerOpt = userRepository.findById(organizerId);

        if (followerOpt.isEmpty() || organizerOpt.isEmpty()) {
            return "User or Organizer not found";
        }

        User follower = followerOpt.get();
        User organizer = organizerOpt.get();

        if (organizer.getRole() != USER_ROLE.ORGANIZER) {
            return "The user is not an organizer";
        }

        if (!organizer.getFollowers().contains(followerId)) {
            return "Not following";
        }

        organizer.removeFollower(followerId);
        userRepository.save(organizer);

        return "Unfollowed successfully";
    }
}
