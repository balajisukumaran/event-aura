/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.repository;

import com.eventaura.backend.entity.TICKET_STATUS;
import com.eventaura.backend.entity.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findAllByStatus(TICKET_STATUS status);
    List<Ticket> findAllByAdminIdAndStatus(String adminId, TICKET_STATUS status);
    List<Ticket> findAllByCustomerIdAndStatus(String customerId, TICKET_STATUS status);
}
