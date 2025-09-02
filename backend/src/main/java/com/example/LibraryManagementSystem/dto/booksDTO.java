package com.example.LibraryManagementSystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class booksDTO {

    @JsonProperty("book_id")
    private Integer bookId;

    private String isbn;
    private String title;
    private String author;
    private String publisher;

    @JsonProperty("year_published")
    private Integer yearPublished;

    private String genre;

    @JsonProperty("copies_total")
    private Integer copiesTotal;

    @JsonProperty("copies_available")
    private Integer copiesAvailable;
}
