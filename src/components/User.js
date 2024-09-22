import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const User = () => {
    const { auth } = useContext(AuthContext);
    const userEmail = auth?.email;

    return (
        <div>
            <h2>User Dashboard</h2>
            <UserNavbar />
            <Outlet />
            <p>Email: {userEmail}</p>
        </div>
    );
};

export default User;
