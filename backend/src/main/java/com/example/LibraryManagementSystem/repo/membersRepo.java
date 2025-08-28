package com.example.LibraryManagementSystem.repo;

import com.example.LibraryManagementSystem.entity.members;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Member;

public interface membersRepo extends JpaRepository<members, Integer> {

}
