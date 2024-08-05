/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.controller;

import com.eventaura.backend.entity.Message;
import com.eventaura.backend.entity.TICKET_STATUS;
import com.eventaura.backend.entity.Ticket;
import com.eventaura.backend.request.TicketRequest;
import com.eventaura.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ticket")
public class SupportTicketController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private TicketService ticketService;

    public SupportTicketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/")
    public ResponseEntity<Object> createTicket(@RequestBody TicketRequest req) {
        Ticket ticket = ticketService.createTicket(req);
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    @PostMapping("/{ticketId}/assign")
    public ResponseEntity<?> assignToMe(@PathVariable String ticketId, @RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");

        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().body("User ID is required.");
        }

        Optional<Ticket> optionalTicket = ticketService.findById(ticketId);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            String message = ticketService.assignTicket(ticket, userId);
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Ticket>> getAllPendingTickets() {
        List<Ticket> tickets = ticketService.findAllByStatus(TICKET_STATUS.PENDING);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @GetMapping("/assigned/{adminId}")
    public ResponseEntity<List<Ticket>> getTicketsAssignedToAdmin(@PathVariable String adminId) {
        List<Ticket> tickets = ticketService.findAllByAdminIdAndStatus(adminId, TICKET_STATUS.IN_PROGRESS);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/created/{customerId}")
    public ResponseEntity<List<Ticket>> getTicketsCreatedByCustomer(@PathVariable String customerId) {
        List<Ticket> tickets = ticketService.findAllByCustomerIdAndStatus(customerId, TICKET_STATUS.IN_PROGRESS);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping("/{ticketId}/close")
    public ResponseEntity<?> closeTicket(@PathVariable String ticketId) {
        Optional<Ticket> optionalTicket = ticketService.findById(ticketId);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            ticketService.updateTicketStatus(ticket, TICKET_STATUS.CLOSED);
            return ResponseEntity.ok("Ticket closed successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @MessageMapping("/tickets/{ticketId}/messages")
    @SendTo("/topic/tickets/{ticketId}")
    public Message send(@DestinationVariable String ticketId, Message message) throws Exception {
        ticketService.sendMessage(ticketId, message);
        messagingTemplate.convertAndSend("/topic/tickets/" + ticketId, message);
        return message;
    }

    @GetMapping("/{ticketId}/messages")
    public ResponseEntity<List<Message>> getMessagesForTicket(@PathVariable String ticketId) {
        List<Message> messages = ticketService.findMessagesByTicketId(ticketId);
        return ResponseEntity.ok(messages);
    }
}
