/**
 * Author : Nikita Davies
 */
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

    @Override
    public Event createEvent(Event event, List<MultipartFile> images) {
        List<String> imageUrls = new ArrayList<>();
        
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                String imageUrl = awsUtils.uploadFileToS3(image, "EVENT_IMAGES", event.getTitle());
                imageUrls.add(awsUtils.fetchImageUrl(awsUtils.getS3BucketName(), imageUrl));
            }
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
            event.setEventType(eventDetails.getEventType());
            event.setLocationType(eventDetails.getLocationType());
            if (newImages != null && !newImages.isEmpty()) {
                // Delete old images
                List<String> oldImageUrls = event.getImages();
                for (String oldImageUrl : oldImageUrls) {
                    awsUtils.deleteFilefromS3(oldImageUrl);
                }

                // Upload new images
                List<String> newImageUrls = new ArrayList<>();
                for (MultipartFile image : newImages) {
                    String imageUrl = awsUtils.uploadFileToS3(image, "EVENT_IMAGES", event.getTitle());
                    newImageUrls.add(awsUtils.fetchImageUrl(awsUtils.getS3BucketName(), imageUrl));
                }
                event.setImages(newImageUrls);
            }
            return eventRepository.save(event);
        }).orElseThrow();
    }
}
