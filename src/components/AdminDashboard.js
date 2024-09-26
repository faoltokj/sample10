import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';
import { Box, TextField, List, ListItem, ListItemText, Link } from '@mui/material';

const USERS_URL = '/users/all'; // Route to get all users

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(USERS_URL, {
                    headers: { Authorization: `Bearer ${auth?.accessToken}` }, // Send accessToken
                });
                setUsers(response.data.users); // Set users from response
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [auth]);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Search by Email"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
            />

            <List>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <ListItem key={user._id}>
                            <ListItemText
                                primary={user.email}
                                secondary={
                                    <Link href={`/admin/users/${user._id}/transactions`} underline="hover">
                                        View Transactions
                                    </Link>
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No users found." />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default AdminDashboard;
