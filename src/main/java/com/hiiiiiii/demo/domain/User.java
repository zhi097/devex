package com.hiiiiiii.demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "log")
public class User {
    @Id
private String username;
private String password;
}
