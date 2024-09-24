import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import User from './components/User';
import UserInfo from './components/UserInfo';
import UserTransactions from './components/UserTransactions';
import NewTransaction from './components/NewTransaction';
import Signup from './components/Signup';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="/user" element={<User />}>
              <Route path="info" element={<UserInfo />} />
              <Route path="transactions" element={<UserTransactions />} />
              <Route path="newtransaction" element={<NewTransaction />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

