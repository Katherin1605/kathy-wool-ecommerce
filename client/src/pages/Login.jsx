import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Login = () => {
  const { auth } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = data;
      auth({ ...user, token }, rememberMe);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-page">
      <div className="card shadow p-4 border-0 form-card">
        <div className="text-center mb-4 mt-2">
          <div className="icon-circle d-inline-flex mb-3 shadow-sm">
            <i className="bi bi-box-arrow-in-right fs-2" aria-hidden></i>
          </div>
          <h2 className="fw-bold mb-1 text-heading">
            Iniciar Sesión
          </h2>
          <p className="text-muted text-md">
            Bienvenido de nuevo a kathyWool
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label text-secondary fw-semibold mb-1 text-sm">
              Correo Electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-envelope" aria-hidden></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0 shadow-none text-md"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Correo electrónico"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary fw-semibold mb-1 text-sm">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-lock" aria-hidden></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-start-0 border-end-0 ps-0 shadow-none text-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
              />
              <span
                className="input-group-text bg-white border-start-0 text-muted"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden></i>
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input shadow-none"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="Recordarme"
              />
              <label
                className="form-check-label text-secondary text-sm"
                htmlFor="rememberMe"
              >
                Recordarme
              </label>
            </div>
            <Link 
              to="/contact" 
              className="link-primary-accent fw-medium text-sm"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="btn-primary w-100 py-2 mb-4"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mb-2">
          <span className="text-secondary text-muted-sm">
            ¿No tienes cuenta?{' '}
          </span>
          <Link
            to="/register"
            className="link-primary-accent fw-bold text-muted-sm"
          >
            Regístrate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;