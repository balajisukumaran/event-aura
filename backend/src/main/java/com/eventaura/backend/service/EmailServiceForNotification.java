package com.eventaura.backend.service;

import com.eventaura.backend.entity.User;
import com.eventaura.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmailServiceForNotification {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendNotification(String organizerId, String eventTitle, String eventDescription) {
        Optional<User> organizerOpt = userRepository.findById(organizerId);

        if (organizerOpt.isPresent()) {
            User organizer = organizerOpt.get();
            List<String> followerEmails = organizer.getFollowers() // Assuming followers are stored with their emails
                    .stream()
                    .map(id -> userRepository.findById(id))
                    .filter(Optional::isPresent)
                    .map(userOpt -> userOpt.get().getEmail())
                    .collect(Collectors.toList());

            sendEmail(organizer.getFirstname() + " " + organizer.getLastname(), eventTitle, eventDescription, followerEmails);
        }
    }

    private void sendEmail(String organizerName, String eventTitle, String eventDescription, List<String> followerEmails) {
        for (String email : followerEmails) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("New Event Created by " + organizerName);
            message.setText("Hello,\n\n" +
                    organizerName + " has created a new event titled '" + eventTitle + "'.\n\n" +
                    "Event Description: " + eventDescription + "\n\n" +
                    "Best regards,\nEvent Aura Team");

            emailSender.send(message);
        }
    }
}
