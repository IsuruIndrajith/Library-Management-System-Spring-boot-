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
    @GeneratedValue(strategy = GenerationType.IDENTITY) //here the primary key is auto generated when a new row is inserted
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

public class members{
    
}
