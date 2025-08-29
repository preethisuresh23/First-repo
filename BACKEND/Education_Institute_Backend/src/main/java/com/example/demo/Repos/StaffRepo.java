package com.example.demo.Repos;

import com.example.demo.Entites.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<Staff, Long> {
    Staff findByName(String name);
    Staff findByEmail(String email);
    Staff findByRegisterNumber(String registerNumber);  // Method to find by register number
}
