package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.entity.members;
import com.example.LibraryManagementSystem.repo.membersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class membersController {

    @Autowired
    membersRepo repo;
//    `localhost:8080/members
    @GetMapping("/members")
    public ResponseEntity<List<members>> getAllMembers(){
      try{
          List<members> membersList = new ArrayList<>();
          repo.findAll().forEach(membersList::add);

          if(membersList.isEmpty()){
              return new ResponseEntity<>(membersList, HttpStatus.NO_CONTENT);
          }

          return new ResponseEntity<>(membersList, HttpStatus.OK);

      } catch(Exception ex){
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

//    localhost:8080/members/1
    @GetMapping("/members/{id:\\d+}")
    public ResponseEntity<members> getMember(@PathVariable int id){
        Optional<members> memberData = repo.findById(id);

        if (memberData.isPresent()){
            return new  ResponseEntity<>(memberData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/members/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<members> createMember(@RequestBody members member){
        members memberObj = repo.save(member);

        return new ResponseEntity<>(memberObj, HttpStatus.OK);
    }

    @PutMapping("/members/update/{id}")
    public ResponseEntity<members> updateMembers(@PathVariable int id, @RequestBody members newMemberData){
        Optional<members> oldMemberData = repo.findById(id);

        if (oldMemberData.isPresent()){
            members updatedMemberData = oldMemberData.get();
            updatedMemberData.setName(newMemberData.getName());
            updatedMemberData.setRegistrationDate(newMemberData.getRegistrationDate());
            updatedMemberData.setContactNo(newMemberData.getContactNo());

            members memberObj = repo.save(updatedMemberData);
            return new ResponseEntity<>(memberObj, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/members/deleteMemberById/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable int id){
        if (repo.existsById(id)){
            repo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}

