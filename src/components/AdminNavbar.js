// AdminNavbar.jsx
import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';

const AdminNavbar = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            setAuth({});
            document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
                component={Link}
                to="/admin/dashboard"
                variant="outlined"
                sx={{
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                    }
                }}
            >
                Dashboard
            </Button>
            <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                    }
                }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default AdminNavbar;
