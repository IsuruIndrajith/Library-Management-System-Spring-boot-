package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.util.varList;
import jakarta.transaction.Transactional;
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

    // ------------------- GET ALL BOOKS -------------------
    @Cacheable(value = "BOOKS_CACHE", key = "'allBooks'")
    public List<booksDTO> getAllBooks() {
        List<books> booksList = booksRepo.findAll();
        List<booksDTO> dtoList = new ArrayList<>();

        for (books b : booksList) {
            dtoList.add(mapToDTO(b));
        }

        return dtoList;
    }

    // ------------------- GET SINGLE BOOK -------------------
    @Cacheable(value = "BOOKS_CACHE", key = "#bookID")
    public booksDTO searchBook(int bookID) {
        return booksRepo.findById(bookID)
                .map(this::mapToDTO)
                .orElse(null);
    }

    // ------------------- SAVE BOOK -------------------
    @CachePut(value = "BOOKS_CACHE", key = "#result.bookId")
    public booksDTO saveBook(booksDTO booksDTO) {
        // Only check existsById if DTO has an ID (update-like case)
        if (booksDTO.getBookId() != null && booksRepo.existsById(booksDTO.getBookId())) {
            return null; // already exists
        }

        books saved = booksRepo.save(mapToEntity(booksDTO));
        return mapToDTO(saved);
    }


    // ------------------- UPDATE BOOK -------------------
    @CachePut(value = "BOOKS_CACHE", key = "#result.bookId")
    public booksDTO updateBooks(booksDTO booksDTO) {
        if (!booksRepo.existsById(booksDTO.getBookId())) return null;

        books saved = booksRepo.save(mapToEntity(booksDTO));
        return mapToDTO(saved);
    }

    // ------------------- DELETE BOOK -------------------
    @CacheEvict(value = "BOOKS_CACHE", key = "#bookID")
    public String deleteBook(int bookID) {
        if (!booksRepo.existsById(bookID)) return varList.RSP_NO_DATA_FOUND;

        booksRepo.deleteById(bookID);
        return varList.RSP_SUCCESS;
    }

    // ------------------- HELPER METHODS -------------------
    private booksDTO mapToDTO(books b) {
        booksDTO dto = new booksDTO();
        dto.setBookId(b.getBookId());
        dto.setIsbn(b.getIsbn());
        dto.setTitle(b.getTitle());
        dto.setAuthor(b.getAuthor());
        dto.setPublisher(b.getPublisher());
        dto.setYearPublished(b.getYearPublished());
        dto.setGenre(b.getGenre());
        dto.setCopiesTotal(b.getCopiesTotal());
        dto.setCopiesAvailable(b.getCopiesAvailable());
        return dto;
    }

    private books mapToEntity(booksDTO dto) {
        books b = new books();
        b.setBookId(dto.getBookId());
        b.setIsbn(dto.getIsbn());
        b.setTitle(dto.getTitle());
        b.setAuthor(dto.getAuthor());
        b.setPublisher(dto.getPublisher());
        b.setYearPublished(dto.getYearPublished());
        b.setGenre(dto.getGenre());
        b.setCopiesTotal(dto.getCopiesTotal());
        b.setCopiesAvailable(dto.getCopiesAvailable());

        // Use safe conversion for nullable integers
        b.setYearPublished(dto.getYearPublished() != null ? dto.getYearPublished() : 0);
        b.setCopiesTotal(dto.getCopiesTotal() != null ? dto.getCopiesTotal() : 0);
        b.setCopiesAvailable(dto.getCopiesAvailable() != null ? dto.getCopiesAvailable() : 0);

        b.setGenre(dto.getGenre());
        return b;
    }
}
