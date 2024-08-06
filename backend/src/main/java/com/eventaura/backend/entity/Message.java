/**
 * Authors : Balaji Sukumaran
 */
package com.eventaura.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;
    private String ticketId;
    private String userId;
    private USER_ROLE typeUser;
    private String message;
    private LocalDateTime timestamp;
}
