package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.dto.ResponseDTO;
import com.example.LibraryManagementSystem.util.varList;
import com.example.LibraryManagementSystem.service.booksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/books")
public class booksController {

    @Autowired
    private booksService booksService;

    @PostMapping("/saveBooks")
    public ResponseEntity<ResponseDTO> saveBooks(@RequestBody booksDTO booksDTO) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            booksDTO savedBook = booksService.saveBook(booksDTO);

            if (savedBook != null) {
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Book saved successfully.");
                responseDTO.setContent(savedBook);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(varList.RSP_DUPLICATED);
                responseDTO.setMessage("Book already exists.");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);
            }

        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateBooks")
    public ResponseEntity<ResponseDTO> updateBooks(@RequestBody booksDTO booksDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            booksDTO updatedBook = booksService.updateBooks(booksDTO);

            if (updatedBook != null) {
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Book updated successfully.");
                responseDTO.setContent(updatedBook);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(varList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No book found to update.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }

        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<ResponseDTO> getAllBooks() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<booksDTO> booksDTOList = booksService.getAllBooks();
            responseDTO.setCode(varList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(booksDTOList);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchBooks/{bookID}")
    public ResponseEntity<ResponseDTO> searchBook(@PathVariable int bookID) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            booksDTO book = booksService.searchBook(bookID);
            if (book != null) {
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(book);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(varList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Book found for this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteBooks/{bookID}")
    public ResponseEntity<ResponseDTO> deleteBook(@PathVariable int bookID) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            String res = booksService.deleteBook(bookID);

            if (res.equals(varList.RSP_SUCCESS)) {
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Book deleted successfully.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(varList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Book found with this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
