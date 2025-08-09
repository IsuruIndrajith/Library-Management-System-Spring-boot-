package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.dto.responseDTO;
import com.example.LibraryManagementSystem.service.booksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/books")
public class booksController {

    @Autowired
    private booksService booksService;

    @PostMapping(value = "/saveBooks")
    public ResponseEntity saveBooks(@RequestBody booksDTO booksDTO){
        try{
            String res=booksService.saveBook(booksDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(booksDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }else if(res.equals("06"){

            }else {

            }
        }catch(Exception ex)
    }
}
