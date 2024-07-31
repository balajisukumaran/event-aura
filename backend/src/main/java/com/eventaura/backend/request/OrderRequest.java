/**
 * Authors : Sruthi Shaji, Kabilesh Ravi Chandran
 */

package com.eventaura.backend.request;


import com.eventaura.backend.entity.Event;
import lombok.Data;

@Data
public class OrderRequest {

    private String user_id;
    private Integer no_of_tickets;
    private Float total;
    private Event event;
}
