import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleGoHome = () => {
        sessionStorage.setItem('isAuthenticated', 'false');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }} onClick={handleGoHome}>
                        <AccountBalanceIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        Web Banking App
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
