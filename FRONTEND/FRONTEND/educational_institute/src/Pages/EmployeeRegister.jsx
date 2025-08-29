import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import AdminNavbar from './AdminNavbar';

function StudentRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [status, setStatus] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [password, setPassword] = useState('');  // New password field
  const [confirmPassword, setConfirmPassword] = useState('');  // Confirm password field

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const studentData = {
      name,
      email,
      contactNumber,
      dob,
      department,
      address,
      gender,
      registrationNumber,
      status,
      joiningDate,
      password,  // Include password in the request body
    };

    try {
      const response = await fetch('http://localhost:6900/api/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        setSnackbarMessage('Student registered successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        const errorMessage = await response.text();
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while registering');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container component="main" maxWidth="sm" sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom style={{fontWeight:'bold'}}>
            STUDENT REGISTER
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              {/* Registration Number and Name Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Registration Number"
                  variant="outlined"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>

              {/* Email and Contact Number Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </Grid>

              {/* Date of Birth and Gender Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Department and Joining Date Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  variant="outlined"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  variant="outlined"
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Address and Status Fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Password and Confirm Password Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: '20px' }}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                REGISTER
              </Button>
            </Box>
          </form>
        </Box>
      </Container>

      {/* Snackbar for success/error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StudentRegister;
