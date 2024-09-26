import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, Checkbox, FormControlLabel } from '@mui/material';

const SIGNUP_ADMIN_URL = '/auth/signup-admin';

const SignupAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    const signupData = {
      email,
      password,
      ...(isAdmin && { key: adminKey }) // Send admin key only if isAdmin is true
    };

    try {
      await axios.post(SIGNUP_ADMIN_URL, JSON.stringify(signupData), { 
        headers: { 'Content-Type': 'application/json' } 
      });
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        setErrorMsg(err.response.data.message || 'Signup failed');
      } else {
        setErrorMsg('Signup failed');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" mb={2}>Sign Up as Admin</Typography>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Verify Password"
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <FormControlLabel
          control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
          label="Signup as Admin"
        />
        {isAdmin && (
          <TextField
            label="Admin Secret Key"
            type="text"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
      <Typography mt={2}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default SignupAdmin;
