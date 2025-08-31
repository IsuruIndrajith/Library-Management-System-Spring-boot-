package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.util.varList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
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

    @CachePut(value = "BOOKS_CACHE", key = "#result.book_id")
    public booksDTO saveBook(booksDTO booksDTO) {
        if (booksRepo.existsById(booksDTO.getBook_id())) {
            return null; // controller will return 409 Conflict
        } else {
            books saved = booksRepo.save(modelMapper.map(booksDTO, books.class));
            return modelMapper.map(saved, booksDTO.class);
        }
    }

    @CachePut(value = "BOOKS_CACHE", key = "#result.book_id")
    public booksDTO updateBooks(booksDTO booksDTO) {
        if (booksRepo.existsById(booksDTO.getBook_id())) {
            books saved = booksRepo.save(modelMapper.map(booksDTO, books.class));
            return modelMapper.map(saved, booksDTO.class);
        } else {
            return null; // controller will return 404 Not Found
        }
    }

    // Cache single book lookups
    @Cacheable(value = "BOOKS_CACHE", key = "#bookID")
    public booksDTO searchBook(int bookID) {
        books book = booksRepo.findById(bookID).orElse(null);
        return book != null ? modelMapper.map(book, booksDTO.class) : null;
    }

    // Cache all books with a fixed key
    @Cacheable(value = "BOOKS_CACHE", key = "'allBooks'")
    public List<booksDTO> getAllBooks() {
        List<books> booksList = booksRepo.findAll();
        return modelMapper.map(booksList, new TypeToken<ArrayList<booksDTO>>() {
        }.getType());
    }

    @CacheEvict(value = "BOOKS_CACHE", key = "#bookID")
    public String deleteBook(int bookID) {
        if (booksRepo.existsById(bookID)) {
            booksRepo.deleteById(bookID);
            return varList.RSP_SUCCESS;
        } else {
            return varList.RSP_NO_DATA_FOUND;
        }
    }
}
