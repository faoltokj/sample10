import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      const jwtToken = token ? token.split('=')[1] : null;

      if (jwtToken) {
        try {
          const response = await axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${jwtToken}` },
          });
          const { email, roles } = response.data;

          if (roles && roles.length) {
            setAuth({ email, roles, accessToken: jwtToken });
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('auth', JSON.stringify({ email, roles, accessToken: jwtToken }));
            setIsAuthenticated(true);

            // Redirect based on roles
            if (window.location.pathname === '/') {
              navigate(roles.includes('admin') ? '/admin/dashboard' : '/user/info');
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
