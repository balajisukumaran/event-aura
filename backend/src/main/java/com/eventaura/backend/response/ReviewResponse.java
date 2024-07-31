/**
 * Author: Sruthi Shaji
 */
package com.eventaura.backend.response;

import lombok.Data;

@Data
public class ReviewResponse {
    private String id;
    private Float rating;
    private String comment;
    private String date;
    private String username;
    private String userimage;
}
