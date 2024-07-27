import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import "./ReviewCard.css";


export default function ReviewCard({ review }) {
    return (
        <div>
            <div className="review-detail-card">
                <div>
                    <img style={{ width: "40px", height: "40px", borderRadius: "50%" }} src={review.userimage} alt={`Review Image ${review.username}`} />
                </div>
                <div style={{ fontSize: "0.8rem", marginLeft: "5%" }}>
                    <p >{review.username}</p>
                    <p>{review.date}</p>
                    <p>{review.description}</p>
                    <Rating
                        name="simple-controlled"
                        value={review.rating}
                        readOnly
                        size="small"
                        color='white'
                    />
                </div>
            </div>
            <Divider style={{ borderColor: 'orange', color: "black" }} variant="middle" component="li" />
        </div>);
}