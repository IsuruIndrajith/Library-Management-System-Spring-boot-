package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.util.varList;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class booksServiceTest {

    @Mock
    booksRepo booksRepo;

    @Mock
    ModelMapper modelMapper;

    @InjectMocks
    booksService booksService;

    private booksDTO getSampleDTO() {
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
        return dto;
    }

    private books getSampleEntity() {
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
        return entity;
    }

    // ---------------------------------------------------
    // saveBook()
    // ---------------------------------------------------
    @Test
    void saveBookShouldSaveWhenBookDoesNotExist() {
        booksDTO dto = getSampleDTO();
        books entity = getSampleEntity();

        Mockito.when(booksRepo.existsById(dto.getBook_id())).thenReturn(false);
        Mockito.when(modelMapper.map(dto, books.class)).thenReturn(entity);
        Mockito.when(booksRepo.save(any(books.class))).thenReturn(entity);
        Mockito.when(modelMapper.map(entity, booksDTO.class)).thenReturn(dto);

        booksDTO result = booksService.saveBook(dto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(dto.getBook_id(), result.getBook_id());
    }

    @Test
    void saveBookShouldReturnNullWhenBookAlreadyExists() {
        booksDTO dto = getSampleDTO();
        Mockito.when(booksRepo.existsById(dto.getBook_id())).thenReturn(true);

        booksDTO result = booksService.saveBook(dto);

        Assertions.assertNull(result);
        Mockito.verify(booksRepo, Mockito.never()).save(any());
    }

    // ---------------------------------------------------
    // updateBooks()
    // ---------------------------------------------------
    @Test
    void updateBooksShouldUpdateWhenBookExists() {
        booksDTO dto = getSampleDTO();
        books entity = getSampleEntity();

        Mockito.when(booksRepo.existsById(dto.getBook_id())).thenReturn(true);
        Mockito.when(modelMapper.map(dto, books.class)).thenReturn(entity);
        Mockito.when(booksRepo.save(any(books.class))).thenReturn(entity);
        Mockito.when(modelMapper.map(entity, booksDTO.class)).thenReturn(dto);

        booksDTO result = booksService.updateBooks(dto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(dto.getTitle(), result.getTitle());
    }

    @Test
    void updateBooksShouldReturnNullWhenBookDoesNotExist() {
        booksDTO dto = getSampleDTO();
        Mockito.when(booksRepo.existsById(dto.getBook_id())).thenReturn(false);

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
        booksDTO dto = getSampleDTO();

        Mockito.when(booksRepo.findById(1)).thenReturn(Optional.of(entity));
        Mockito.when(modelMapper.map(entity, booksDTO.class)).thenReturn(dto);

        booksDTO result = booksService.searchBook(1);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(dto.getAuthor(), result.getAuthor());
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
        booksDTO dto = getSampleDTO();

        List<books> entities = new ArrayList<>();
        entities.add(entity);

        List<booksDTO> dtos = new ArrayList<>();
        dtos.add(dto);

        Mockito.when(booksRepo.findAll()).thenReturn(entities);
        Mockito.when(modelMapper.map(entities, ArrayList.class)).thenReturn((ArrayList<booksDTO>) dtos);

        List<booksDTO> result = booksService.getAllBooks();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
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
