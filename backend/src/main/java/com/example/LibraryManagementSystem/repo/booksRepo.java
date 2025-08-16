package com.example.LibraryManagementSystem.repo;

import com.example.LibraryManagementSystem.entity.books;
import org.springframework.data.jpa.repository.JpaRepository;

public interface booksRepo extends JpaRepository<books, Integer> {
}
