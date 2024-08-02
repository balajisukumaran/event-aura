package com.eventaura.backend.service;

public interface FollowService {
    String followOrganizer(String followerId, String organizerId);
    String unfollowOrganizer(String followerId, String organizerId);
    boolean isFollowing(String userId, String organizerId);


}
