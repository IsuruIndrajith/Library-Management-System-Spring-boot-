package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.util.varList;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@ExtendWith(MockitoExtension.class)
class booksServiceTest {

    @Mock
    booksRepo booksRepo;

    @InjectMocks
    booksService booksService;

    private booksDTO getSampleDTO() {
        booksDTO dto = new booksDTO();
        dto.setBookId(1);
        dto.setAuthor("Isuru");
        dto.setIsbn("479512567");
        dto.setTitle("H20");
        dto.setPublisher("ISURU");
        dto.setYearPublished(2001);
        dto.setGenre("programming");
        dto.setCopiesAvailable(4);
        dto.setCopiesTotal(5);
        return dto;
    }

    private books getSampleEntity() {
        books entity = new books();
        entity.setBookId(1);
        entity.setAuthor("Isuru");
        entity.setIsbn("479512567");
        entity.setTitle("H20");
        entity.setPublisher("ISURU");
        entity.setYearPublished(2001);
        entity.setGenre("programming");
        entity.setCopiesAvailable(4);
        entity.setCopiesTotal(5);
        return entity;
    }

    // ---------------------------------------------------
    // saveBook()
    // ---------------------------------------------------
    @Test
    void saveBookShouldSaveWhenBookDoesNotExist() {
        booksDTO dto = getSampleDTO();
        dto.setBookId(null); // For new book, ID should be null
        books savedEntity = getSampleEntity();

        Mockito.when(booksRepo.save(any(books.class))).thenReturn(savedEntity);

        booksDTO result = booksService.saveBook(dto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(savedEntity.getBookId(), result.getBookId());
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getAuthor(), result.getAuthor());
    }

    @Test
    void saveBookShouldReturnNullWhenBookAlreadyExists() {
        booksDTO dto = getSampleDTO();
        Mockito.when(booksRepo.existsById(dto.getBookId())).thenReturn(true);

        booksDTO result = booksService.saveBook(dto);

        Assertions.assertNull(result);
        Mockito.verify(booksRepo, Mockito.never()).save(any());
    }

    @Test
    void saveBookShouldSaveWhenBookIdIsNull() {
        booksDTO dto = getSampleDTO();
        dto.setBookId(null);
        books savedEntity = getSampleEntity();

        Mockito.when(booksRepo.save(any(books.class))).thenReturn(savedEntity);

        booksDTO result = booksService.saveBook(dto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(savedEntity.getBookId(), result.getBookId());
    }

    // ---------------------------------------------------
    // updateBooks()
    // ---------------------------------------------------
    @Test
    void updateBooksShouldUpdateWhenBookExists() {
        booksDTO dto = getSampleDTO();
        books savedEntity = getSampleEntity();

        Mockito.when(booksRepo.existsById(dto.getBookId())).thenReturn(true);
        Mockito.when(booksRepo.save(any(books.class))).thenReturn(savedEntity);

        booksDTO result = booksService.updateBooks(dto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
        Assertions.assertEquals(dto.getAuthor(), result.getAuthor());
    }

    @Test
    void updateBooksShouldReturnNullWhenBookDoesNotExist() {
        booksDTO dto = getSampleDTO();
        Mockito.when(booksRepo.existsById(dto.getBookId())).thenReturn(false);

        booksDTO result = booksService.updateBooks(dto);

        Assertions.assertNull(result);
        Mockito.verify(booksRepo, Mockito.never()).save(any());
    }

    // ---------------------------------------------------
    // searchBook()
    // ---------------------------------------------------
    @Test
    void searchBookShouldReturnDTOWhenFound() {
        books entity = getSampleEntity();

        Mockito.when(booksRepo.findById(1)).thenReturn(Optional.of(entity));

        booksDTO result = booksService.searchBook(1);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(entity.getAuthor(), result.getAuthor());
        Assertions.assertEquals(entity.getTitle(), result.getTitle());
        Assertions.assertEquals(entity.getBookId(), result.getBookId());
    }

    @Test
    void searchBookShouldReturnNullWhenNotFound() {
        Mockito.when(booksRepo.findById(1)).thenReturn(Optional.empty());

        booksDTO result = booksService.searchBook(1);

        Assertions.assertNull(result);
    }

    // ---------------------------------------------------
    // getAllBooks()
    // ---------------------------------------------------
    @Test
    void getAllBooksShouldReturnList() {
        books entity = getSampleEntity();
        List<books> entities = new ArrayList<>();
        entities.add(entity);

        Mockito.when(booksRepo.findAll()).thenReturn(entities);

        List<booksDTO> result = booksService.getAllBooks();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals(entity.getTitle(), result.get(0).getTitle());
        Assertions.assertEquals(entity.getAuthor(), result.get(0).getAuthor());
    }

    @Test
    void getAllBooksShouldReturnEmptyListWhenNoBooks() {
        List<books> emptyList = new ArrayList<>();
        Mockito.when(booksRepo.findAll()).thenReturn(emptyList);

        List<booksDTO> result = booksService.getAllBooks();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(0, result.size());
    }

    // ---------------------------------------------------
    // deleteBook()
    // ---------------------------------------------------
    @Test
    void deleteBookShouldReturnSuccessWhenBookExists() {
        Mockito.when(booksRepo.existsById(1)).thenReturn(true);

        String result = booksService.deleteBook(1);

        Assertions.assertEquals(varList.RSP_SUCCESS, result);
        Mockito.verify(booksRepo, Mockito.times(1)).deleteById(1);
    }

    @Test
    void deleteBookShouldReturnNoDataFoundWhenBookDoesNotExist() {
        Mockito.when(booksRepo.existsById(1)).thenReturn(false);

        String result = booksService.deleteBook(1);

        Assertions.assertEquals(varList.RSP_NO_DATA_FOUND, result);
        Mockito.verify(booksRepo, Mockito.never()).deleteById(1);
    }



}
