import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const UserNavbar = () => {
    const { setAuth } = useContext(AuthContext);


    const handleLogout = () => {
        setAuth({}); // Clear the auth context
        // Optionally, call your logout API here
    };

    return (
        <nav>
            <ul>
                <li><Link to="/user/info">User Info</Link></li>
                <li><Link to="/user/transactions">Transaction List</Link></li>
                <li><Link to="/user/newtransaction">New Transaction</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
