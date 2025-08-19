package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.dto.booksDTO;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.LibraryManagementSystem.util.varList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public String updateBooks(booksDTO booksDTO){
        if(booksRepo.existsById(booksDTO.getBook_id())){
            booksRepo.save(modelMapper.map(booksDTO, books.class));
            return varList.RSP_SUCCESS;
        }
        else{
            return varList.RSP_NO_DATA_FOUND;
        }
    }

    public List<booksDTO> getAllBooks(){
        List<books> booksList = booksRepo.findAll();
        return modelMapper.map(booksList, new TypeToken<ArrayList<booksDTO>>(){
        }.getType());
    }

    public booksDTO searchBook(int bookID){
        if (booksRepo.existsById(bookID)){
            books book = booksRepo.findById(bookID).orElse(null);
            return modelMapper.map(book, booksDTO.class);
        }else {
            return null;
        }
    }

    public String deleteBook(int bookID){
        if(booksRepo.existsById(bookID)){
            booksRepo.deleteById(bookID);
            return varList.RSP_SUCCESS;
        }else {
            return varList.RSP_NO_DATA_FOUND;
        }
    }
}
