import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'

import Register from './pages/Register'
import Login from './pages/Login'
import Products from './pages/Products'
import Cart from './pages/Cart'


//<Route path="/login" element={<Login />} />

// falta separar rutas públicas de las rutas de usuario y de las rutas de Admin
function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
      
          <Routes>


            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
  
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  )
}

export default App