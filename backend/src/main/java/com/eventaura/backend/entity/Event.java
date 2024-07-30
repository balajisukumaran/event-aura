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

    private String date;
    private String startTime;
    private String endTime;
    private String title;
    private String description;
    private Float price;
    private String location;
    private String organizerId;
    private List<String> images;

    public String getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(String organizerId) {
        this.organizerId = organizerId;
    }

    @JsonIgnore
    private List<Review> reviews = new ArrayList<Review>();

}
