package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.dto.booksDTO;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.LibraryManagementSystem.util.varList;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class booksService {
    @Autowired
    private booksRepo booksRepo;

    @Autowired
    private ModelMapper modelMapper;

    public String saveBook(booksDTO booksDTO){
        if (booksRepo.existsById(booksDTO.getBook_id())){
            return varList.RSP_DUPLICATED;
        }else {
            booksRepo.save(modelMapper.map(booksDTO, books.class));
            return varList.RSP_SUCCESS;
        }

    }
}
