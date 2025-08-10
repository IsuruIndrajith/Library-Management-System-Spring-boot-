package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.dto.ResponseDTO;
import com.example.LibraryManagementSystem.util.varList;
import com.example.LibraryManagementSystem.service.booksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/books")
public class booksController {

    @Autowired
    private booksService booksService;


    @PostMapping("/saveBooks")
    public ResponseEntity<ResponseDTO> saveBooks(@RequestBody booksDTO booksDTO) {
        ResponseDTO responseDTO = new ResponseDTO(); // Create new instance for each request

        try {
            String res = booksService.saveBook(booksDTO);

            if (res.equals(varList.RSP_SUCCESS)) {
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Book saved successfully.");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);

            } else if (res.equals(varList.RSP_DUPLICATED)) {
                responseDTO.setCode(varList.RSP_DUPLICATED);
                responseDTO.setMessage("Book already exists.");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);

            } else {
                responseDTO.setCode(varList.RSP_FAIL);
                responseDTO.setMessage("Failed to save book.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
