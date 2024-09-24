import React, { createContext, useState, useEffect } from 'react'; // Import createContext
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext({}); // Define the AuthContext

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated'));
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated || window.location.pathname === '/') {
        const token = document.cookie;
        
        if (token) {
          const jwtToken = token.split('=')[1];
          try {
            const response = await axios.get('/users/profile', {
              headers: { Authorization: `Bearer ${jwtToken}` },
            });
            const { email, roles } = response.data;

            setAuth({ email, roles, accessToken: jwtToken });
            sessionStorage.setItem('isAuthenticated', 'true');
            setIsAuthenticated('true');
            navigate('/user/info');
          } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [isAuthenticated]); // Add 'navigate' to the dependency array

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
