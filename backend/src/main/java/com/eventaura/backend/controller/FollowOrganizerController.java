package com.eventaura.backend.controller;

import com.eventaura.backend.request.EventRequest;
import com.eventaura.backend.request.FollowRequest;
import com.eventaura.backend.response.CountResponse;
import com.eventaura.backend.response.FollowResponse;
import com.eventaura.backend.service.EmailServiceForNotification;
import com.eventaura.backend.service.FollowService;
import com.eventaura.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FollowOrganizerController {

    @Autowired
    private FollowService followService;

    @Autowired
    private EmailServiceForNotification emailService;

    @PostMapping("/follow")
    public FollowResponse followOrganizer(@RequestBody FollowRequest followRequest) {
        String result = followService.followOrganizer(followRequest.getId(), followRequest.getOrganizerId());
        return new FollowResponse("Followed successfully".equals(result), result);
    }

    @PostMapping("/isfollowing")
    public FollowResponse isFollowing(@RequestBody FollowRequest followRequest) {
        boolean isFollowing = followService.isFollowing(followRequest.getId(), followRequest.getOrganizerId());
        return new FollowResponse(isFollowing, isFollowing ? "true" : "false");
    }

    @PostMapping("/unfollow")
    public FollowResponse unfollowOrganizer(@RequestBody FollowRequest followRequest) {
        String result = followService.unfollowOrganizer(followRequest.getId(), followRequest.getOrganizerId());
        return new FollowResponse("Unfollowed successfully".equals(result), result);
    }

    @PostMapping("/notifications")
    public String createEvent(@RequestBody EventRequest eventRequest) {
        emailService.sendNotification(eventRequest.getOrganizerId(),eventRequest.getEventTitle(),eventRequest.getEventDescription());
        return "Event created and notifications sent";
    }

    @GetMapping("/followingCount")
    public ResponseEntity<CountResponse> followCount(@RequestParam String userId) {
        // Get the total follower count for the given userId
        long followerCount = followService.getFollowerCount(userId);

        // Return total follower count
        CountResponse countResponse = new CountResponse(followerCount);

        // Return JSON response
        return ResponseEntity.ok(countResponse);
    }
}
