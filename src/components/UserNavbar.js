import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';

const UserNavbar = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post('/auth/logout'); // Send logout request to server
        setAuth({}); // Clear the auth context
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate('/login'); // Redirect to login page
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
                component={Link} 
                to="/user/info" 
                variant="outlined"
                sx={{
                    '&:hover': {
                        backgroundColor: 'blue', // Blue background on hover
                        color: 'white', // White text on hover
                    }
                }}
            >
                User Info
            </Button>
            <Button 
                component={Link} 
                to="/user/transactions" 
                variant="outlined"
                sx={{
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                    }
                }}
            >
                Transactions
            </Button>
            <Button 
                component={Link} 
                to="/user/newtransaction" 
                variant="outlined"
                sx={{
                    '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                    }
                }}
            >
                New Transaction
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

export default UserNavbar;
