package com.example.LibraryManagementSystem.dto;

import com.example.LibraryManagementSystem.entity.User;
import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private User.Role role = User.Role.ADMIN;
}
