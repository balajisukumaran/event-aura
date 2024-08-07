/**
 * Author : Sruthi Shaji
 */
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import "./ReviewCard.css";
import { format, parse } from 'date-fns';


const formatDate = (dateString) => {
    const dateFormat = 'dd-MM-yyyy hh:mm:ss a';
    const date = parse(dateString, dateFormat, new Date());
    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const day = format(date, 'd');
    const dayWithSuffix = day + getDaySuffix(day);

    return `${dayWithSuffix} ${format(date, 'MMMM, yyyy')}`;
};



export default function ReviewCard({ review }) {
    return (
        <div>
            <div className="review-detail-card">
                <div>
                    <img style={{ width: "40px", height: "40px", borderRadius: "50%" }} src={review.userimage} alt={`Review ${review.username}`} />
                </div>
                <div style={{ fontSize: "0.8rem", marginLeft: "5%" }}>
                    <p>{review.username}</p>
                    <p>{formatDate(review.date)}</p>
                    <p>{review.comment}</p>
                    <Rating
                        name="simple-controlled"
                        value={review.rating}
                        readOnly
                        size="small"
                        color='white'
                    />
                </div>
            </div>
            <Divider style={{ borderColor: 'orange', color: "#1A2529" }} variant="middle" component="li" />
        </div>);
}