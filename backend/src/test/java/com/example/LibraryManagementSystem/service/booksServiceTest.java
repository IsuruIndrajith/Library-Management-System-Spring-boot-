package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class booksServiceTest {

    @Mock
    booksRepo booksRepo;

    @Mock
    ModelMapper modelMapper;

    @InjectMocks
    booksService booksService;

    @Test
    void saveBooksShouldSaveSuccessfully() {
        // Arrange
        booksDTO dto = new booksDTO();
        dto.setBook_id(1);
        dto.setAuthor("Isuru");
        dto.setIsbn("479512567");
        dto.setTitle("H20");
        dto.setPublisher("ISURU");
        dto.setYear_published(2001);
        dto.setGenre("programming");
        dto.setCopies_available(4);
        dto.setCopies_total(5);

        books entity = new books();
        entity.setBook_id(1);
        entity.setAuthor("Isuru");
        entity.setIsbn("479512567");
        entity.setTitle("H20");
        entity.setPublisher("ISURU");
        entity.setYear_published(2001);
        entity.setGenre("programming");
        entity.setCopies_available(4);
        entity.setCopies_total(5);

        // Mock modelMapper and repo behavior
        Mockito.when(modelMapper.map(dto, books.class)).thenReturn(entity);
        Mockito.when(booksRepo.save(any(books.class))).thenReturn(entity);
        Mockito.when(modelMapper.map(entity, booksDTO.class)).thenReturn(dto);

        // Act
        booksDTO addedBook = booksService.saveBook(dto);

        // Assert
        Assertions.assertNotNull(addedBook);
        Assertions.assertEquals(dto.getBook_id(), addedBook.getBook_id());
        Assertions.assertEquals(dto.getTitle(), addedBook.getTitle());
    }
}
