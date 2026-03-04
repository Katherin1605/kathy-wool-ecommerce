import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'


//<Route path="/login" element={<Login />} />
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />
      <div className="container mt-4"></div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
        <div/>
        <Footer />
  
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
