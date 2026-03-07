import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const register = (name, userEmail, password, role = 'Cliente') => {
    const newUser = { id: Date.now(), name, email: userEmail, password, role };
    const fakeToken = `token_${Date.now()}`;
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setToken(fakeToken);
    setEmail(userEmail);
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('email', userEmail);
    return newUser;
  };

  const auth = (userData) => {
    const fakeToken = `token_${Date.now()}`;
    setUser(userData);
    setToken(fakeToken);
    setEmail(userData.email);
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('email', userData.email);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail(null);
    setUser(null);
  };

  const getProfile = () => {
    return user;
  };

  const stateGlobal = {
    token,
    logout,
    auth,
    register,
    email,
    getProfile
  };

  return <UserContext.Provider value={stateGlobal}>{children}</UserContext.Provider>;
};

export default UserContext;