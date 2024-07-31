/**
 * Author: Sruthi Shaji
 */
package com.eventaura.backend.request;

import lombok.Data;

@Data
public class ReviewRequest {

    private String user_id;
    private String event_id;
    private String date;
    private String description;
    private Float rating;

}
