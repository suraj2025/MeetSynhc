package com.meetsync.Entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;
    private String picture;
    private String googleId;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column(length = 2048)
private String googleAccessToken;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
