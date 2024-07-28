import Rating from '@mui/material/Rating';
import "./AddReview.css";

export default function AddReview({ review, setReview, onSubmit, onCancel }) {

    function handleReview(event, field) {
        const value = field === 'rating' ? event : event.target.value;
        setReview(prevReview => ({
            ...prevReview,
            [field]: value
        }));
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
                <button onClick={onSubmit}>Post Comment</button>
                <button onClick={onCancel}>Cancel</button>
            </div>


        </div>
    );

}