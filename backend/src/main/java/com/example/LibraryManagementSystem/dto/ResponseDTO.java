package com.example.LibraryManagementSystem.dto;

import lombok.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDTO {
    private String Code;
    private String Message;
    private Object Content;
}
