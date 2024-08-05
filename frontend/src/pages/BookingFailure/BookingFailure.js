/**
 * Author : Sruthi Shaji
 */
import React, { useEffect } from "react";
import "./BookingFailure.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BookingFailure() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const declineOrder = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/order/decline/${id}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error confirming order:", error);
      }
    };

    declineOrder();
  }, [id]);

  return (
    <div>
      <div className="failure-message">
        <div className="crossmark">&#10007;</div>
        <h1>Order Failed</h1>
        <p>Your order was not successful.</p>
        <p>Please try again later.</p>
        <button className="home-button" onClick={handleGoHome}>
          GO TO HOME
        </button>
      </div>
    </div>
  );
}
