import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import User from './components/User';
import UserInfo from './components/UserInfo';
import UserTransactions from './components/UserTransactions';
import NewTransaction from './components/NewTransaction';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';

// const ROLES = {
//   'user': 2001,
//   'Admin': 5150
// };

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="/user" element={<User />}>
              <Route path="info" element={<UserInfo />} />
              <Route path="transactions" element={<UserTransactions />} />
              <Route path="newtransaction" element={<NewTransaction />} />
            </Route>
          </Route>


          {/* catch all */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
