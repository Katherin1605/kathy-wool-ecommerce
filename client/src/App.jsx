import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Register from './pages/Register'
import Login from './pages/Login'


//<Route path="/login" element={<Login />} />
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      
        <Routes>
           <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
  
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
