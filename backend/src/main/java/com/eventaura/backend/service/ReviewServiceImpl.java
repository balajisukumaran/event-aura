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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    private static DateTimeFormatter stringToDateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a"); // Adjust the pattern to match your date format
    private static SimpleDateFormat dateToStringFormatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss a");

    @Override
    public void createReview(ReviewRequest req) {
        Review review = new Review();
        java.util.Date now = new java.util.Date(System.currentTimeMillis());
        String formattedDate = dateToStringFormatter.format(now);
        review.setAddedAt(formattedDate);

        review.setUserId(req.getUser_id());
        review.setEventId(req.getEvent_id());
        review.setRating(req.getRating());
        review.setComment(req.getDescription());
        reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> getReviewsByEventId(String eventId) {
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        List<Review> reviews = reviewRepository.findAllByEventId(eventId);

        for (Review review : reviews) {
            String userId = review.getUserId();
            User user = userRepository.findById(userId).orElse(null);

            if (user != null) {
                ReviewResponse reviewResponse = new ReviewResponse();
                reviewResponse.setId(review.getId());
                reviewResponse.setRating(review.getRating());
                reviewResponse.setComment(review.getComment());
                reviewResponse.setDate(review.getAddedAt());
                reviewResponse.setUsername(user.getFirstname() + " " + user.getLastname());
                reviewResponse.setUserimage(user.getImageurl());
                reviewResponses.add(reviewResponse);
            }
        }

        // Sort the reviewResponses list based on the date in descending order
        reviewResponses.sort((r1, r2) -> {
            LocalDateTime date1 = LocalDateTime.parse(r1.getDate(), stringToDateTimeFormatter);
            LocalDateTime date2 = LocalDateTime.parse(r2.getDate(), stringToDateTimeFormatter);
            System.out.println("Comparing dates: " + date1 + " and " + date2);
            return date2.compareTo(date1); // Descending order
        });

        return reviewResponses;
    }
}
