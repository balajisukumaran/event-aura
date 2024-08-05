/**
 * Authors : Sruthi Shaji, Kabilesh Ravi Chandran
 */

package com.eventaura.backend.request;
import lombok.Data;

@Data
public class TicketRequest {
    private String name;
    private String orderId;
    private String customerId;
}
