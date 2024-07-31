/**
 * Author: Sruthi Shaji
 */
package com.eventaura.backend.service;


import com.eventaura.backend.entity.Order;
import com.eventaura.backend.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
