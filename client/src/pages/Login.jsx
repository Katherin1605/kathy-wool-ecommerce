import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = 'https://69a9119832e2d46caf45190f.mockapi.io/api/v1/users';

const Login = () => {
  const { auth } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const pinkColor = '#f52a8f';
  const bgColor = '#fdf6f9';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const { data } = await axios.get(API_URL, { params: { email, password } });
      if (data.length > 0) {
        const user = data[0];
        auth(user);
        if (user.role === 'Administrador') {
          navigate('/administrador');
        } else {
          navigate('/home');
        }
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.');
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="card shadow p-4 border-0" 
        style={{ width: '100%', maxWidth: '420px', borderRadius: '1.5rem' }}
      >
        
        <div className="text-center mb-4 mt-2">
          <div 
            className="d-inline-flex justify-content-center align-items-center mb-3 shadow-sm"
            style={{ 
              backgroundColor: pinkColor, 
              color: 'white', 
              width: '65px', 
              height: '65px', 
              borderRadius: '50%' 
            }}
          >
            <i className="bi bi-box-arrow-in-right fs-2"></i>
          </div>
          <h2 className="fw-bold mb-1" style={{ color: '#2c3345', letterSpacing: '-0.5px' }}>
            Iniciar Sesión
          </h2>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>
            Bienvenido de nuevo a kathyWool
          </p>
        </div>

        {error && <div className="alert alert-danger py-2" style={{ fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
      
          <div className="mb-3">
            <label className="form-label text-secondary fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
              Correo Electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-envelope"></i>
              </span>
              <input 
                type="email" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="tu@email.com" 
                style={{ fontSize: '0.95rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-lock"></i>
              </span>
              <input 
                type="password" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="••••••••" 
                style={{ fontSize: '0.95rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input 
                className="form-check-input shadow-none" 
                type="checkbox" 
                id="rememberMe" 
              />
              <label 
                className="form-check-label text-secondary" 
                htmlFor="rememberMe" 
                style={{ fontSize: '0.85rem' }}
              >
                Recordarme
              </label>
            </div>
            <Link 
              to="#" 
              className="text-decoration-none fw-medium" 
              style={{ color: pinkColor, fontSize: '0.85rem' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button 
            type="submit" 
            className="btn text-white w-100 py-2 fw-bold shadow-sm mb-4" 
            style={{ 
              backgroundColor: pinkColor, 
              borderRadius: '0.75rem',
              fontSize: '1rem' 
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mb-2">
          <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
            ¿No tienes cuenta?{' '}
          </span>
          <Link 
            to="/register" 
            className="text-decoration-none fw-bold" 
            style={{ color: pinkColor, fontSize: '0.9rem' }}
          >
            Regístrate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;