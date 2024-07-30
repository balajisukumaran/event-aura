package com.eventaura.backend.service;

import com.eventaura.backend.entity.Review;
import com.eventaura.backend.request.ReviewRequest;
import com.eventaura.backend.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    void createReview(ReviewRequest req);

    List<ReviewResponse> getReviewsByEventId(String eventId);
}
