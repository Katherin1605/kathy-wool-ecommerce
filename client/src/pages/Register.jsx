import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_URL = 'https://69a9119832e2d46caf45190f.mockapi.io/api/v1/users';

const Registro = () => {
  const { register } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const colorRosa = '#f52a8f';
  const colorFondo = '#fdf6f9';

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
      const { data } = await axios.post(API_URL, { name, email, password, role: 'Cliente' });
      register(data.name, data.email, data.password, data.role);
      setSuccess(`¡Bienvenido/a ${data.name}! Cuenta creada exitosamente.`);
      setTimeout(() => navigate('/'), 1500);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario. Intenta de nuevo.');
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ backgroundColor: colorFondo }}
    >
      <div 
        className="card shadow-sm p-4 border-0" 
        style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}
      >
        
        <div className="text-center mb-4 mt-2">
          <div 
            className="d-inline-flex justify-content-center align-items-center mb-3"
            style={{ 
              backgroundColor: colorRosa, 
              color: 'white', 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%' 
            }}
          >
            <i className="bi bi-person-plus fs-3"></i>
          </div>
          <h2 className="fw-bold" style={{ color: '#2c3345' }}>Crear Cuenta</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Únete a la comunidad kathyWool
          </p>
        </div>

        {error && <div className="alert alert-danger py-2" style={{ fontSize: '0.85rem' }}>{error}</div>}
        {success && <div className="alert alert-success py-2" style={{ fontSize: '0.85rem' }}>{success}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label text-muted fw-semibold" style={{ fontSize: '0.85rem' }}>
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
            <label className="form-label text-muted fw-semibold" style={{ fontSize: '0.85rem' }}>
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
            <label className="form-label text-muted fw-semibold" style={{ fontSize: '0.85rem' }}>
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
            <label className="form-label text-muted fw-semibold" style={{ fontSize: '0.85rem' }}>
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
            className="btn text-white w-100 py-2 fw-semibold mb-3" 
            style={{ backgroundColor: colorRosa, borderRadius: '0.5rem' }}
          >
            Registrarse
          </button>
        </form>


        <div className="text-center mb-2">
          <span className="text-muted" style={{ fontSize: '0.9rem' }}>¿Ya tienes cuenta? </span>
          <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: colorRosa, fontSize: '0.9rem' }}>
            Inicia Sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Registro;