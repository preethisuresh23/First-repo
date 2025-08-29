import React, { useEffect, useState } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux state
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Button, CircularProgress } from '@mui/material';

function EmployeeDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const registerNumber = useSelector((state) => state.user.registerNumber); // Access the registerNumber from Redux state

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6900/api/student/attendance/by-student?studentRegistrationNumber=${registerNumber}`);
        const result = await response.json();
        setAttendance(result);
        setFilteredAttendance(result); // Set initial data
      } catch (error) {
        console.error('Error fetching attendance details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (registerNumber) {  // Make sure the registerNumber is available before fetching data
      fetchAttendanceDetails();
    }
  }, [registerNumber]); // Depend on registerNumber so the fetch re-runs if it changes
  

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilteredAttendance(attendance); // No filtering, just use all attendance data
    } else {
      const filteredData = attendance.filter(item =>
        item.date.includes(searchQuery) || item.staffRegistrationNumber.includes(searchQuery)
      );
      setFilteredAttendance(filteredData);
    }
  };

  return (
    <div>
      <EmployeeNavbar />
      <br />
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>Attendance Details</h2>

      {/* Display Register Number */}
      <div style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
        <strong>Register Number: </strong>{registerNumber}
      </div>

      {/* Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by Date or Staff Registration Number"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '350px', marginRight: '10px' }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          style={{
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Search
        </Button>
      </div>

      {/* Loading Spinner (Centered) */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', margin: '0 auto' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Staff Registration Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.staffRegistrationNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default EmployeeDashboard;
