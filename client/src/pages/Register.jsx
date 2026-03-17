import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce.onrender.com';

const Registro = () => {
  const { register } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/users`, { name, email, password, role: 'cliente' });
      register(data.user.name, data.user.email, data.user.password, data.user.role);
      setSuccess(`¡Bienvenido/a ${data.user.name}! Cuenta creada exitosamente.`);
      setTimeout(() => navigate('/login'), 1500);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario. Intenta de nuevo.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50 bg-page">
      <div className="card shadow-sm p-4 border-0 form-card form-card--narrow">
        <div className="text-center mb-4 mt-2">
          <div className="icon-circle icon-circle--sm d-inline-flex mb-3">
            <i className="bi bi-person-plus fs-3" aria-hidden></i>
          </div>
          <h2 className="fw-bold text-heading">Crear Cuenta</h2>
          <p className="text-muted text-muted-sm">
            Únete a la comunidad kathyWool
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 text-sm">{error}</div>}
        {success && <div className="alert alert-success py-2 text-sm">{success}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label text-muted fw-semibold text-sm">
              Nombre Completo
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-person text-muted"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>


          <div className="mb-3">
            <label className="form-label text-muted fw-semibold text-sm">
              Correo Electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope text-muted"></i>
              </span>
              <input 
                type="email" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>


          <div className="mb-3">
            <label className="form-label text-muted fw-semibold text-sm">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input 
                type="password" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>


          <div className="mb-4">
            <label className="form-label text-muted fw-semibold text-sm">
              Confirmar Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input 
                type="password" 
                className="form-control border-start-0 ps-0 shadow-none" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-100 py-2 fw-semibold mb-3"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center mb-2">
          <span className="text-muted text-muted-sm">¿Ya tienes cuenta? </span>
          <Link to="/login" className="link-primary-accent fw-semibold text-muted-sm">
            Inicia Sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Registro;