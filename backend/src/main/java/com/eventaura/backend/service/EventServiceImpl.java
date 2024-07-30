package com.eventaura.backend.service;

import com.eventaura.backend.entity.Event;
import com.eventaura.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.eventaura.backend.utils.Awsutils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService{
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private Awsutils awsUtils;

    @Override
    public List<Event> getEvents() {
        List<Event> events = eventRepository.findAll();
        return events;
    }

    @Override
    public List<Event> getEventsByOrganizerId(String organizerId) {
        List<Event> events = eventRepository.getEventsByOrganizerId(organizerId);
        return events;
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    // @Override
    // public Event createEvent(Event event) {
    //     return eventRepository.save(event);
    // }

    @Override
    public Event createEvent(Event event, List<MultipartFile> images) {
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String imageUrl = awsUtils.uploadFileToS3(image, "EVENT_IMAGES", event.getTitle());
            imageUrls.add(awsUtils.fetchImageUrl(awsUtils.getS3BucketName(), imageUrl));
        }
        event.setImages(imageUrls);
        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Event updateEvent(String id, Event eventDetails, List<MultipartFile> newImages) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(eventDetails.getTitle());
            event.setDescription(eventDetails.getDescription());
            event.setPrice(eventDetails.getPrice());
            event.setLocation(eventDetails.getLocation());
            event.setReviews(eventDetails.getReviews());
            event.setDate(eventDetails.getDate());
            event.setStartTime(eventDetails.getStartTime());
            event.setEndTime(eventDetails.getEndTime());
            event.setOrganizerId(eventDetails.getOrganizerId());
            return eventRepository.save(event);
        }).orElseThrow();
    }
}
