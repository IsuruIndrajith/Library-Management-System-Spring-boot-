package com.example.LibraryManagementSystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Books")
public class books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer bookId;

    private String isbn;
    private String title;
    private String author;
    private String publisher;


    private Integer yearPublished;
    private String genre;
    private Integer copiesTotal;
    private Integer copiesAvailable;
}
