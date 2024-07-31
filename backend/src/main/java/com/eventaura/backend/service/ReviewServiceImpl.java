/**
 * Author: Sruthi Shaji
 */

package com.eventaura.backend.service;

import com.eventaura.backend.entity.Review;
import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.ReviewRepository;
import com.eventaura.backend.repository.UserRepository;
import com.eventaura.backend.request.ReviewRequest;
import com.eventaura.backend.response.ReviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    static SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    @Override
    public void createReview(ReviewRequest req) {
        Review review = new Review();
        java.util.Date now = new java.util.Date(System.currentTimeMillis());
        String formattedDate = sdf.format(now);
        review.setAddedAt(formattedDate);

        review.setUserId(req.getUser_id());
        review.setEventId(req.getEvent_id());
        review.setRating(req.getRating());
        review.setComment(req.getDescription());
        reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> getReviewsByEventId(String eventId) {
        List<ReviewResponse> reviewResponses = new ArrayList();
        List<Review> reviews = reviewRepository.findAllByEventId(eventId);
        for(Review review : reviews) {
            String user_id = review.getUserId();
            User user = userRepository.findById(user_id).get();
            ReviewResponse reviewResponse = new ReviewResponse();
            reviewResponse.setId(review.getId());
            reviewResponse.setRating(review.getRating());
            reviewResponse.setComment(review.getComment());
            reviewResponse.setDate(review.getAddedAt());
            reviewResponse.setUsername(user.getFirstname()+ " " + user.getLastname());
            reviewResponse.setUserimage(user.getImageurl());
            reviewResponses.add(reviewResponse);
        }
        return reviewResponses;
    }
}
