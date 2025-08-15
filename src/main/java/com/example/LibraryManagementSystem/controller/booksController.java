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



    @PutMapping(value = "/updateBooks")
    public ResponseEntity updateBooks(@RequestBody booksDTO booksDTO){
        ResponseDTO responseDTO = new ResponseDTO(); // Create new instance for each request
        try{
            String res=booksService.updateBooks(booksDTO);
            if (res.equals("00")){
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity(responseDTO, HttpStatus.OK);

            }else if(res.equals("06")){
                responseDTO.setCode(varList.RSP_DUPLICATED);
                responseDTO.setMessage("Book added");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity(responseDTO, HttpStatus.CONFLICT);

            }else {
                responseDTO.setCode(varList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getAllBooks")
    public ResponseEntity getAllEmployees(){
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<booksDTO> booksDTOList = booksService.getAllBooks();
            responseDTO.setCode(varList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(booksDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.OK);

        }catch (Exception ex){
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/searchBooks{bookID}")
    public ResponseEntity searchBook(@PathVariable int bookID){
        ResponseDTO responseDTO = new ResponseDTO();
        try{
            booksDTO booksDTO = booksService.searchBook(bookID);
            if(booksDTO !=null){
                responseDTO.setCode(varList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(booksDTO);
                return new  ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(varList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Books found dor this bookID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }

        }catch (Exception e){
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}

