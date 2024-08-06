/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.service;

import com.eventaura.backend.entity.Message;
import com.eventaura.backend.entity.TICKET_STATUS;
import com.eventaura.backend.entity.Ticket;
import com.eventaura.backend.repository.TicketRepository;
import com.eventaura.backend.request.TicketRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    TicketRepository ticketRepository;

    @Override
    public Ticket createTicket(TicketRequest req) {
        Ticket ticket = new Ticket();
        ticket.setName(req.getName());
        ticket.setOrderId(req.getOrderId());
        ticket.setCustomerId(req.getCustomerId());
        ticket.setStatus(TICKET_STATUS.PENDING);

        return ticketRepository.save(ticket);
    }

    @Override
    public Optional<Ticket> findById(String ticketId) {
        return ticketRepository.findById(ticketId);
    }

    @Override
    public String assignTicket(Ticket ticket, String userId) {
        if (TICKET_STATUS.PENDING.equals(ticket.getStatus())) {
            ticket.setStatus(TICKET_STATUS.IN_PROGRESS);
            ticket.setAdminId(userId);
            ticketRepository.save(ticket);
            return "Ticket assigned successfully.";
        } else {
            return "Ticket is not in Pending status.";
        }
    }

    @Override
    public List<Ticket> findAllByStatus(TICKET_STATUS ticketStatus) {
        return ticketRepository.findAllByStatus(ticketStatus);
    }

    @Override
    public List<Ticket> findAllByAdminIdAndStatus(String adminId, TICKET_STATUS status) {
        return ticketRepository.findAllByAdminIdAndStatus(adminId, status);
    }

    @Override
    public List<Ticket> findAllByCustomerIdAndStatus(String customerId, TICKET_STATUS status) {
        return ticketRepository.findAllByCustomerIdAndStatus(customerId, status);
    }

    @Override
    public void sendMessage(String ticketId, Message message) throws Exception {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new Exception("Ticket not found"));
        List<Message> messages = ticket.getMessages();

        // Generate a unique ID and set the timestamp for the message
        message.setId(UUID.randomUUID().toString());
        message.setTimestamp(LocalDateTime.now());

        if (messages == null) {
            messages = new ArrayList<>();
        }

        messages.add(message);
        ticket.setMessages(messages);

        ticketRepository.save(ticket);
    }


    @Override
    public List<Message> findMessagesByTicketId(String ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).get();
        return ticket.getMessages();
    }

    @Override
    public void updateTicketStatus(Ticket ticket, TICKET_STATUS ticketStatus) {
        ticket.setStatus(ticketStatus);
        ticketRepository.save(ticket);
    }
}
