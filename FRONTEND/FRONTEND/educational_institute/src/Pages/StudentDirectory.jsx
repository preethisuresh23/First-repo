import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField } from '@mui/material';
import AdminNavbar from './AdminNavbar';

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:6900/api/student/details')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  // Filter students based on the search query
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976D2' }}>
          STUDENT DIRECTORY
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Name or Registration Number"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as the user types
          sx={{ marginBottom: 3 }} // Add some space below the search bar
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="student directory">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#1976d2', // Blue background color for header
                  '& th': {
                    color: 'white',  // White text for the header
                    fontWeight: 'bold',
                    fontSize: '16px',  // Font size for header
                  },
                }}
              >
                <TableCell>Registration Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joining Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transition: 'background-color 0.3s ease',
                    },
                  }}
                >
                  <TableCell>{student.registrationNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contactNumber}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>{student.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default StudentDirectory;
