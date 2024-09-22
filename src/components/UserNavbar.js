import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';

const UserNavbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/auth/logout'); // Send logout request to server
    setAuth({}); // Clear the auth context
    navigate('/login'); // Redirect to login page
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
