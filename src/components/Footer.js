import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', textAlign: 'center', marginTop: 'auto' }}
        >
            <Typography variant="body1">© 2024 Levi Maor. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;
