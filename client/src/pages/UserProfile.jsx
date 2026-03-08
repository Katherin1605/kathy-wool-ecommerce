import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { getProfile } = useUser();
  const navigate = useNavigate();
  const user = getProfile();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p className="text-muted">No hay sesión activa.</p>
        <button className="btn-primary mt-3" onClick={() => navigate('/login')}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container mt-4">
      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="d-flex align-items-center gap-4">
        <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <i className="bi bi-person-fill" aria-hidden></i>
            </div>
            <button className="profile-avatar-edit" aria-label="Cambiar foto">
              <i className="bi bi-camera-fill"></i>
            </button>
          </div>
          <div>
           <h4 className="fw-bold text-heading mb-1">{user.name}</h4>
            <p className="text-muted text-sm mb-1">
              <i className="bi bi-envelope me-1"></i>{user.email}
            </p>
            <p className="text-muted text-sm mb-3">Amante de los tejidos artesanales</p>
            <button className="btn-primary px-4">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

        <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold text-heading mb-4">
          <i className="bi bi-heart text-primary-accent me-2" aria-hidden></i>
          Mis Favoritos
        </h5>
        <div className="profile-empty-state">
          <i className="bi bi-heart profile-empty-icon mb-3" aria-hidden></i>
          <p className="text-muted text-md mb-3">Aún no tienes productos favoritos</p>
          <button className="btn-primary px-4" onClick={() => navigate('/products')}>
            Explorar Productos
          </button>
        </div>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold text-heading mb-4">
          <i className="bi bi-bag text-primary-accent me-2" aria-hidden></i>
          Mis Compras
        </h5>
        <div className="profile-empty-state">
          <i className="bi bi-bag profile-empty-icon mb-3" aria-hidden></i>
          <p className="text-muted text-md mb-3">Aún no has realizado ninguna compra</p>
          <button className="btn-primary px-4" onClick={() => navigate('/products')}>
            Comenzar a Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;