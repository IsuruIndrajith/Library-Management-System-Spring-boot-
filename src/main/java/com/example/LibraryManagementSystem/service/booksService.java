package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.dto.booksDTO;
import org.springframework.beans.factory.annotation.Autowired;


public class booksService {
    @Autowired
    private booksRepo booksRepo;

    public String saveEployee(booksDTO booksDTO){
        if (booksRepo.existsById(booksDTO.getBook_id()))

    }
}
