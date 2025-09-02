package com.example.LibraryManagementSystem.util;

import com.example.LibraryManagementSystem.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "LibraryManagementSystemSecretKeyForJWTAuthenticationAndAuthorization2024");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 86400000);
    }

    @Test
    void generateJwtTokenShouldReturnValidToken() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setRole(User.Role.ADMIN);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        // Act
        String token = jwtUtils.generateJwtToken(authentication);

        // Assert
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void getUserNameFromJwtTokenShouldReturnCorrectUsername() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setRole(User.Role.ADMIN);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        String token = jwtUtils.generateJwtToken(authentication);

        // Act
        String username = jwtUtils.getUserNameFromJwtToken(token);

        // Assert
        assertEquals("testuser", username);
    }

    @Test
    void validateJwtTokenShouldReturnTrueForValidToken() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setEmail("test@example.com");
        user.setRole(User.Role.ADMIN);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        String token = jwtUtils.generateJwtToken(authentication);

        // Act & Assert
        assertTrue(jwtUtils.validateJwtToken(token));
    }

    @Test
    void validateJwtTokenShouldReturnFalseForInvalidToken() {
        // Act & Assert
        assertFalse(jwtUtils.validateJwtToken("invalid.token.here"));
    }

    @Test
    void validateJwtTokenShouldReturnFalseForNullToken() {
        // Act & Assert
        assertFalse(jwtUtils.validateJwtToken(null));
    }

    @Test
    void validateJwtTokenShouldReturnFalseForEmptyToken() {
        // Act & Assert
        assertFalse(jwtUtils.validateJwtToken(""));
    }
}
