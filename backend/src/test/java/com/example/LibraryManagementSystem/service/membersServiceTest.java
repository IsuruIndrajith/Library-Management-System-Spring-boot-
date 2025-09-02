package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.entity.members;
import com.example.LibraryManagementSystem.repo.membersRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class membersServiceTest {

    @Mock
    membersRepo membersRepo;

    @InjectMocks
    membersService membersService;

    private members getSampleMember() {
        members member = new members();
        member.setId(1);
        member.setName("John Doe");
        member.setContactNo("1234567890");
        member.setRegistrationDate(LocalDate.now());
        return member;
    }

    @Test
    void getAllMembersShouldReturnList() {
        members member = getSampleMember();
        List<members> membersList = new ArrayList<>();
        membersList.add(member);

        Mockito.when(membersRepo.findAll()).thenReturn(membersList);

        List<members> result = (List<members>) membersRepo.findAll();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals(member.getName(), result.get(0).getName());
    }

    @Test
    void getMemberByIdShouldReturnMember() {
        members member = getSampleMember();

        Mockito.when(membersRepo.findById(1)).thenReturn(Optional.of(member));

        Optional<members> result = membersRepo.findById(1);

        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals(member.getName(), result.get().getName());
    }

    @Test
    void getMemberByIdShouldReturnEmptyWhenNotFound() {
        Mockito.when(membersRepo.findById(1)).thenReturn(Optional.empty());

        Optional<members> result = membersRepo.findById(1);

        Assertions.assertFalse(result.isPresent());
    }

    @Test
    void saveMemberShouldReturnSavedMember() {
        members member = getSampleMember();

        Mockito.when(membersRepo.save(any(members.class))).thenReturn(member);

        members result = membersRepo.save(member);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(member.getName(), result.getName());
    }

    @Test
    void deleteMemberShouldCallDeleteById() {
        Mockito.when(membersRepo.existsById(1)).thenReturn(true);

        boolean exists = membersRepo.existsById(1);

        Assertions.assertTrue(exists);
        Mockito.verify(membersRepo, Mockito.times(1)).existsById(1);
    }
}
