import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
      console.log(token)

      if (token) {
        const jwtToken = token.split('=')[1];
        console.log(jwtToken)
        try {
          const response = await axios.get('/users/profile', { headers: { Authorization: `Bearer ${jwtToken}` } });
          const { email, roles } = response.data;
          setAuth({ email, roles, accessToken: jwtToken });
          navigate('/user/info'); // Redirect if user is authenticated
        } catch (error) {
          console.error('Error fetching user profile:', error);
          navigate('/login'); // Redirect to login on error
        }
      } else {
        navigate('/login'); // Redirect to login if no token is found
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
