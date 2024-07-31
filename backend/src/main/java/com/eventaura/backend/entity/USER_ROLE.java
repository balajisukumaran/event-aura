/**
 * Author: Vishaka Vinod
 */
package com.eventaura.backend.entity;

public enum USER_ROLE {
    ORGANIZER,
    ATTENDEE,
    ADMIN;

    public static USER_ROLE getInstance(String role) {
        switch (role){
            case "ORGANIZER": return USER_ROLE.ORGANIZER;
            case "ATTENDEE": return USER_ROLE.ATTENDEE;
            case "ADMIN": return USER_ROLE.ADMIN;
        }
        return USER_ROLE.ATTENDEE;
    }
}
