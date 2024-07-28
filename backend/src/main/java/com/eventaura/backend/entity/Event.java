package com.eventaura.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private Date date;
    private Time startTime;
    private Time endTime;
    private String title;
    private String description;
    private Float price;
    private Integer maxSlots;
    private String location;
    private User organizer;
    private boolean isAvailable;

    @JsonIgnore
    private List<String> images;

    @JsonIgnore
    private List<Review> reviews = new ArrayList<Review>();

}
