package com.eventaura.backend.controller;


import com.eventaura.backend.request.ReviewRequest;
import com.eventaura.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    @PostMapping("/add")
    public ResponseEntity<String> createOrder(@RequestBody ReviewRequest req){
        try
        {
            reviewService.createReview(req);
            return new ResponseEntity("Review added.", HttpStatus.OK);
        }
        catch (Exception ex)
        {
            return new ResponseEntity("Error while adding review.", HttpStatus.BAD_REQUEST);
        }
    }


}
