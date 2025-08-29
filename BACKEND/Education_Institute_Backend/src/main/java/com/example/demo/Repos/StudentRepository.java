package com.example.demo.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entites.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom query methods
    Student findByEmail(String email);  // Find by email
    Student findByRegistrationNumber(String registrationNumber);  // Find by registration number
 // New method to find students by department
    List<Student> findByDepartment(String department);
}
