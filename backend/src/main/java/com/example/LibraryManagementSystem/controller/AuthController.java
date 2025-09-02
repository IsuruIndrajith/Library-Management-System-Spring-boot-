package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.dto.JwtResponse;
import com.example.LibraryManagementSystem.dto.LoginRequest;
import com.example.LibraryManagementSystem.dto.ResponseDTO;
import com.example.LibraryManagementSystem.dto.SignupRequest;
import com.example.LibraryManagementSystem.entity.User;
import com.example.LibraryManagementSystem.repo.UserRepo;
import com.example.LibraryManagementSystem.util.JwtUtils;
import com.example.LibraryManagementSystem.util.varList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserRepo userRepository;
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/signin")
    public ResponseEntity<ResponseDTO> authenticateUser(@RequestBody LoginRequest loginRequest) {
        ResponseDTO responseDTO = new ResponseDTO();
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            User user = (User) authentication.getPrincipal();
            JwtResponse jwtResponse = new JwtResponse(jwt, user.getUsername(), user.getEmail(), user.getRole().name());
            
            responseDTO.setCode(varList.RSP_SUCCESS);
            responseDTO.setMessage("User signed in successfully!");
            responseDTO.setContent(jwtResponse);
            
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            
        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody SignupRequest signUpRequest) {
        ResponseDTO responseDTO = new ResponseDTO();
        
        try {
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                responseDTO.setCode(varList.RSP_DUPLICATED);
                responseDTO.setMessage("Error: Username is already taken!");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            }
            
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                responseDTO.setCode(varList.RSP_DUPLICATED);
                responseDTO.setMessage("Error: Email is already in use!");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            }
            
            // Only allow ADMIN role registration
            if (signUpRequest.getRole() != User.Role.ADMIN) {
                responseDTO.setCode(varList.RSP_ERROR);
                responseDTO.setMessage("Error: Only ADMIN users can register in this system!");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            }
            
            // Create new admin user account
            User user = new User();
            user.setUsername(signUpRequest.getUsername());
            user.setEmail(signUpRequest.getEmail());
            user.setPassword(encoder.encode(signUpRequest.getPassword()));
            user.setRole(User.Role.ADMIN); // Force ADMIN role
            
            userRepository.save(user);
            
            responseDTO.setCode(varList.RSP_SUCCESS);
            responseDTO.setMessage("User registered successfully!");
            responseDTO.setContent(null);
            
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            
        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<ResponseDTO> getUserProfile() {
        ResponseDTO responseDTO = new ResponseDTO();
        
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            
            responseDTO.setCode(varList.RSP_SUCCESS);
            responseDTO.setMessage("User profile retrieved successfully!");
            responseDTO.setContent(user);
            
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            
        } catch (Exception ex) {
            responseDTO.setCode(varList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
