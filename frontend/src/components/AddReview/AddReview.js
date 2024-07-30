import Rating from '@mui/material/Rating';
import { useState } from 'react';
import "./AddReview.css";
import axios from 'axios';

export default function AddReview({ onSubmit, onCancel }) {
    const [review, setReview] = useState({ description: "", rating: 0 });

    function handleReview(event, field) {
        const value = field === 'rating' ? event : event.target.value;
        setReview(prevReview => ({
            ...prevReview,
            [field]: value
        }));
    }

    function onAddReview(e) {
        e.preventDefault();
        onSubmit(review.rating, review.description);
    }
    return (
        <div className="add-review-container">
            <h5>Leave a Review</h5>
            <textarea
                placeholder="Add a review"
                value={review.description}
                onChange={(event) => handleReview(event, "description")}
                rows={3}
            />
            <div className="add-review-star">
                <span>Please Rate: </span>
                <Rating
                    name="simple-controlled"
                    value={review.rating}
                    onChange={(event, newValue) => handleReview(newValue, "rating")}
                />
            </div>
            <div className="add-review-buttons">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onAddReview}>Post Comment</button>
            </div>


        </div>
    );

}