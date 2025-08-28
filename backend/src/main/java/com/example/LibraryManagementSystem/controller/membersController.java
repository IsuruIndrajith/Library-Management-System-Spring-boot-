package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.entity.members;
import com.example.LibraryManagementSystem.repo.membersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class membersController {

    @Autowired
    membersRepo repo;
//    `localhost:8080/members
    @GetMapping("/members")
    public List<members> getAllMembers(){
        List<members> members = repo.findAll();
        return members;
    }

//    localhost:8080/members/1
    @GetMapping("/members/{id:\\\\d+}")
    public members getMember(@PathVariable int id){
        members member = repo.findById(id).get();
        return member;
    }

    @PostMapping("/members/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public members createMember(@RequestBody members member){
        return repo.save(member);
    }

    @PutMapping("/members/update")
    public members updateMembers(members member){
        members member = repo.findById(id).get();


    }
    @DeleteMapping
    public void deleteMember(){

    }


}

