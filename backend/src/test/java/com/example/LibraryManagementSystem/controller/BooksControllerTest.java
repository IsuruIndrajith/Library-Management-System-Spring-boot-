package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.booksDTO;
import com.example.LibraryManagementSystem.entity.User;
import com.example.LibraryManagementSystem.entity.books;
import com.example.LibraryManagementSystem.repo.UserRepo;
import com.example.LibraryManagementSystem.repo.booksRepo;
import com.example.LibraryManagementSystem.util.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"
})
@Transactional
class BooksControllerTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private booksRepo booksRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    private String jwtToken;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        userRepo.deleteAll();
        booksRepo.deleteAll();

        // Create test user and generate JWT token
        User testUser = new User();
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword(passwordEncoder.encode("password"));
        testUser.setRole(User.Role.ADMIN);
        userRepo.save(testUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(testUser, null, testUser.getAuthorities());
        jwtToken = jwtUtils.generateJwtToken(authentication);
    }

    @Test
    void getAllBooksShouldRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/books/getAllBooks"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getAllBooksShouldReturnBooksWhenAuthenticated() throws Exception {
        // Create test book
        books testBook = new books();
        testBook.setTitle("Test Book");
        testBook.setAuthor("Test Author");
        testBook.setIsbn("1234567890");
        testBook.setPublisher("Test Publisher");
        testBook.setYearPublished(2023);
        testBook.setGenre("Fiction");
        testBook.setCopiesTotal(10);
        testBook.setCopiesAvailable(8);
        booksRepo.save(testBook);

        mockMvc.perform(get("/api/v1/books/getAllBooks")
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("00"))
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].title").value("Test Book"));
    }

    @Test
    void saveBookShouldCreateNewBookWhenAuthenticated() throws Exception {
        booksDTO bookDTO = new booksDTO();
        bookDTO.setTitle("New Book");
        bookDTO.setAuthor("New Author");
        bookDTO.setIsbn("9876543210");
        bookDTO.setPublisher("New Publisher");
        bookDTO.setYearPublished(2024);
        bookDTO.setGenre("Non-Fiction");
        bookDTO.setCopiesTotal(5);
        bookDTO.setCopiesAvailable(5);

        mockMvc.perform(post("/api/v1/books/saveBooks")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("00"))
                .andExpect(jsonPath("$.content.title").value("New Book"));
    }

    @Test
    void searchBookShouldReturnBookWhenFound() throws Exception {
        // Create test book
        books testBook = new books();
        testBook.setTitle("Search Book");
        testBook.setAuthor("Search Author");
        testBook.setIsbn("1111111111");
        testBook.setPublisher("Search Publisher");
        testBook.setYearPublished(2023);
        testBook.setGenre("Mystery");
        testBook.setCopiesTotal(3);
        testBook.setCopiesAvailable(2);
        books savedBook = booksRepo.save(testBook);

        mockMvc.perform(get("/api/v1/books/searchBooks/" + savedBook.getBookId())
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("00"))
                .andExpect(jsonPath("$.content.title").value("Search Book"));
    }

    @Test
    void deleteBookShouldRemoveBookWhenExists() throws Exception {
        // Create test book
        books testBook = new books();
        testBook.setTitle("Delete Book");
        testBook.setAuthor("Delete Author");
        testBook.setIsbn("2222222222");
        testBook.setPublisher("Delete Publisher");
        testBook.setYearPublished(2023);
        testBook.setGenre("Drama");
        testBook.setCopiesTotal(1);
        testBook.setCopiesAvailable(1);
        books savedBook = booksRepo.save(testBook);

        mockMvc.perform(delete("/api/v1/books/deleteBooks/" + savedBook.getBookId())
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("00"))
                .andExpect(jsonPath("$.message").value("Book deleted successfully."));
    }

    @Test
    void updateBookShouldUpdateExistingBook() throws Exception {
        // Create test book
        books testBook = new books();
        testBook.setTitle("Original Title");
        testBook.setAuthor("Original Author");
        testBook.setIsbn("3333333333");
        testBook.setPublisher("Original Publisher");
        testBook.setYearPublished(2023);
        testBook.setGenre("Original Genre");
        testBook.setCopiesTotal(5);
        testBook.setCopiesAvailable(3);
        books savedBook = booksRepo.save(testBook);

        booksDTO updateDTO = new booksDTO();
        updateDTO.setBookId(savedBook.getBookId());
        updateDTO.setTitle("Updated Title");
        updateDTO.setAuthor("Updated Author");
        updateDTO.setIsbn("3333333333");
        updateDTO.setPublisher("Updated Publisher");
        updateDTO.setYearPublished(2024);
        updateDTO.setGenre("Updated Genre");
        updateDTO.setCopiesTotal(7);
        updateDTO.setCopiesAvailable(5);

        mockMvc.perform(put("/api/v1/books/updateBooks")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("00"))
                .andExpect(jsonPath("$.content.title").value("Updated Title"));
    }
}
