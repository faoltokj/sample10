import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';

const PROFILE_URL = '/users/profile';

const User = () => {
  const { auth } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
        setUserProfile(response.data);
      } catch (err) {
        setErrorMsg('Failed to load user profile');
      }
    };

    fetchUserProfile();
  }, [auth]);

  return (
    <div>
      <h2>User Profile</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {userProfile ? (
        <div>
          <p>Balance: {userProfile.balance}</p>
          <p>Roles: {userProfile.roles ? userProfile.roles.join(', ') : 'No roles assigned'}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default User;
