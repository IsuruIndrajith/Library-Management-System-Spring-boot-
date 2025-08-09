package com.example.LibraryManagementSystem.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class booksDTO {
    private int book_id;
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private int year_published;
    private String genre;
    private int copies_total;
    private int copies_available;
}
