/**
 * Authors: Merin Mary Saju
 */
package com.eventaura.backend.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
@JsonInclude(JsonInclude.Include.NON_NULL) // Include non-null fields only
public class User implements UserDetails {

    @Id
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    private USER_ROLE role;
    private String status;
    private String imageurl;

    // Only applicable for organizers
    private Integer no_of_followers;
    private List<String> followers;

    // Return the list of roles: user, admin
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public USER_ROLE getRole() {
        return role;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Custom setters to handle role-specific attributes
    public void setRole(USER_ROLE role) {
        this.role = role;
        if (role == USER_ROLE.ORGANIZER) {
            this.no_of_followers = 0;
            this.followers = new ArrayList<>();
        } else {
            this.no_of_followers = null;
            this.followers = null;
        }
    }

    // Other getters and setters...

    public void addFollower(String followerId) {
        if (this.role == USER_ROLE.ORGANIZER && this.followers != null) {
            this.followers.add(followerId);
            this.no_of_followers = this.followers.size();
        }
    }

    public void removeFollower(String followerId) {
        if (this.role == USER_ROLE.ORGANIZER && this.followers != null) {
            this.followers.remove(followerId);
            this.no_of_followers = this.followers.size();
        }
    }
}
