import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const SIGNUP_URL = '/auth/signup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      await axios.post(SIGNUP_URL, JSON.stringify({ email, password }), { 
        headers: { 'Content-Type': 'application/json' } 
      });
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
      <Typography variant="h4" mb={2}>Sign Up</Typography>
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

export default Signup;
