package com.example.demo.Entites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;  // Add import for Column

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true) // Ensure unique email
    private String email;

    @Column(unique = true) // Ensure unique registration number
    private String registrationNumber;
    
    private String name;
    private String contactNumber;
    private String dob;
    private String department;
    private String address;
    private String gender;
    private String status;
    private String joiningDate;
    private String password;  // Add password field

    // Getters and setters...

    public Student() {
    }

    public String getPassword() {
        return password;
    }

    public Student(Long id, String name, String email, String contactNumber, String dob, String department,
            String address, String gender, String registrationNumber, String status, String joiningDate,
            String password) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.department = department;
        this.address = address;
        this.gender = gender;
        this.registrationNumber = registrationNumber;
        this.status = status;
        this.joiningDate = joiningDate;
        this.password = password;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
