import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserProvider } from './context/UserContext'

import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProfile from "./pages/AdminProfile"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import NewProduct from "./pages/admin/NewProduct"
import UserLayout from './layouts/UserLayout'
import UserProfile from './pages/UserProfile'
import MyOrders from './components/MyOrders'
import MyFavorites from './components/MyFavorites'
import ProductDetails from './pages/ProductDetails'

import { CartProvider } from './context/CartContext'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout"


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <CartProvider>
        <Routes>

          {/* Rutas públicas */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Rutas protegidas para admin */}

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/products" element={<AdminProducts />} />

            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* <Route path="/admin/users" element={<AdminUsers />} /> */}

            <Route path="/admin/new-product" element={<NewProduct />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* Rutas protegidas para usuarios */}
          <Route element={<UserLayout />}>

            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/orders" element={<MyOrders />} />
            <Route path="/user/favorites" element={<MyFavorites />} />

          </Route>

          {/* NOT FOUND */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </CartProvider>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App