package com.eventaura.backend.service;

import com.eventaura.backend.entity.Review;
import com.eventaura.backend.repository.ReviewRepository;
import com.eventaura.backend.request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

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
}
