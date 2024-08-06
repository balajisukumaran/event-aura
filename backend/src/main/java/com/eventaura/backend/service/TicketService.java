/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.service;

import com.eventaura.backend.entity.Message;
import com.eventaura.backend.entity.TICKET_STATUS;
import com.eventaura.backend.entity.Ticket;
import com.eventaura.backend.request.TicketRequest;

import java.util.List;
import java.util.Optional;

public interface TicketService {

    Ticket createTicket(TicketRequest req);

    Optional<Ticket> findById(String ticketId);

    String assignTicket(Ticket ticket, String userId);

    List<Ticket> findAllByStatus(TICKET_STATUS ticketStatus);

    List<Ticket> findAllByAdminIdAndStatus(String adminId, TICKET_STATUS status);

    List<Ticket> findAllByCustomerIdAndStatus(String customerId, TICKET_STATUS status);

    void sendMessage(String ticketId, Message message) throws Exception;

    List<Message> findMessagesByTicketId(String ticketId);

    void updateTicketStatus(Ticket ticket, TICKET_STATUS ticketStatus);
}
