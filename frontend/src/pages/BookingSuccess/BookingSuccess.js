/**
 * Author : Sruthi Shaji
 */
import React, { useEffect } from "react";
import "./BookingSuccess.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/order/confirm/${id}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error confirming order:", error);
      }
    };

    confirmOrder();
  }, [id]);

  return (
    <div>
      <div className="success-message">
        <div className="checkmark">&#10003;</div>
        <h1>Order Success</h1>
        <p>Your order was successful.</p>
        <p>Have A Greate Day!</p>
        <button className="home-button" onClick={handleGoHome}>
          GO TO HOME
        </button>
      </div>
    </div>
  );
}
