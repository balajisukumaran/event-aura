/**
 * Author: Balaji Sukumaran
 */
package com.eventaura.backend.entity;

public enum TICKET_STATUS {
    PENDING,
    IN_PROGRESS,
    CLOSED,
    UNDEFINED;

    public static TICKET_STATUS getInstance(String role) {
        return switch (role) {
            case "Pending" -> TICKET_STATUS.PENDING;
            case "In progress" -> TICKET_STATUS.IN_PROGRESS;
            case "Closed" -> TICKET_STATUS.CLOSED;
            default -> TICKET_STATUS.UNDEFINED;
        };
    }

    public static String getValue(TICKET_STATUS status) {
        return switch (status) {
            case PENDING -> "Pending";
            case IN_PROGRESS -> "In Progress";
            case CLOSED -> "Closed";
            default -> "Undefined";
        };
    }
}
