package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.members;
import com.example.LibraryManagementSystem.repo.membersRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class membersService {
    @Autowired
    private membersRepo membersRepo;


    public members updateMember(members member){
        member.findById(member.getMemberId()).orElseThrow();
        return member.save(member);
    }
}
