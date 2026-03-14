import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';



const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [email, setEmail] = useState(() => localStorage.getItem('email'));
  const [favorites, setFavorites] = useState([]);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const fetchFavorites = async () => {
  if (!token) return;
  try {
    const res = await axios.get(`${API_URL}/users/me/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFavorites(res.data.map(f => f.product_id));
  } catch (error) {
    console.error('Error cargando favoritos', error);
  }
};

useEffect(() => {
  fetchFavorites();
}, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (name, userEmail, password, role = 'cliente') => {
    const newUser = { name, email: userEmail, role };
    
    setUser(newUser);
    setEmail(userEmail);
    
    localStorage.setItem('email', userEmail);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return newUser;
  };

  const auth = (userData) => {
    const realToken = userData.token;
    setUser(userData);
    setToken(realToken);
    setEmail(userData.email);

    localStorage.setItem('token', realToken);
    localStorage.setItem('email', userData.email);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    localStorage.removeItem('email');
    setToken(null);
    setEmail(null);
    setUser(null);
    setFavorites([]);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const stateGlobal = {
    user,
    token,
    logout,
    auth,
    register,
    email,
    updateProfile,
    favorites,
    setFavorites,
    fetchFavorites
  };

  return <UserContext.Provider value={stateGlobal}>{children}</UserContext.Provider>;
};

export default UserContext;