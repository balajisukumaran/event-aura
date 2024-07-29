package com.eventaura.backend.service;

import com.eventaura.backend.entity.Review;
import com.eventaura.backend.request.ReviewRequest;

public interface ReviewService {
    void createReview(ReviewRequest req);
}
