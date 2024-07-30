package com.eventaura.backend.controller;


import com.eventaura.backend.entity.Review;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.request.ReviewRequest;
import com.eventaura.backend.response.ReviewResponse;
import com.eventaura.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    @PostMapping("/add")
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest req){
        try
        {
            User user = new User();
            user.setId("66a72c971c8184337945e28b");
            req.setUser_id(user.getId());
            reviewService.createReview(req);
            return new ResponseEntity("Review added.", HttpStatus.OK);
        }
        catch (Exception ex)
        {
            return new ResponseEntity("Error while adding review.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getEventReviews(@RequestParam("event") String eventId) {
        try
        {
            List<ReviewResponse> reviews = reviewService.getReviewsByEventId(eventId);
            return new ResponseEntity(reviews, HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity("Error while fetching reviews. ", HttpStatus.BAD_REQUEST);
        }
    }


}
