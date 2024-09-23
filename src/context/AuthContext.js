import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated');
      const currentPath = window.location.pathname;

      if (!isAuthenticated || currentPath === '/') {
        const token = document.cookie;
        
        if (token) {
          const jwtToken = token.split('=')[1];
          try {
            const response = await axios.get('/users/profile', {
              headers: { Authorization: `Bearer ${jwtToken}` },
            });
            const { email, roles } = response.data;

            setAuth({ email, roles, accessToken: jwtToken });
            sessionStorage.setItem('isAuthenticated', 'true'); // Set the flag
            navigate('/user/info'); // Redirect if user is authenticated and session is not yet set
          } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/login'); // Redirect to login on error
          }
        } else {
          navigate('/login'); // Redirect to login if no token is found
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
