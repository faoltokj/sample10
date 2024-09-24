import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const LOGIN_URL = '/auth/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), { headers: { 'Content-Type': 'application/json' } });

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ email, roles, accessToken });
      document.cookie = `token=${accessToken}; path=/`;

      navigate('/user/info');
    } catch (err) {
      if (!err?.response) {
        setErrorMsg('No Server Response');
      } else if (err.response?.status === 401) {
        setErrorMsg('Unauthorized');
      } else {
        setErrorMsg('Login Failed');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" mb={2}>Login</Typography>
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>

      <Typography mt={2}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
