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
    @Column(name = "book_id")
    private Integer bookId;

    private String isbn;
    private String title;
    private String author;
    private String publisher;

    @Column(name = "year_published")
    private int yearPublished;
    private String genre;
    private int copiesTotal;
    private int copiesAvailable;
}
