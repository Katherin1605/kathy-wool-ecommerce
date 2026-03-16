import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const avatars = [
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Sawyer',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Liam',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Valentina',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Emery',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Ryan',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Maria',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Aidan',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Jameson',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Andrea',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Destiny',
  'https://api.dicebear.com/9.x/thumbs/svg?seed=Sophia',
];

const AdminProfile = () => {
  const { user, token, updateProfile } = useUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Administrador de kathyWool',
  });

  useEffect(() => {
    if (!token) return;
    axios.get(`${API_URL}/api/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error cargando pedidos', err));
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const res = await axios.put(`${API_URL}/users/me`, {
        name: form.name,
        email: form.email,
        bio: form.bio
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      updateProfile(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error guardando perfil', error);
    }
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email, bio: user.bio || 'Administrador de kathyWool' });
    setIsEditing(false);
  };

  const selectAvatar = async (url) => {
    try {
      await axios.put(`${API_URL}/users/me/avatar`, { profile_image: url }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      updateProfile({ profile_image: url });
      setShowAvatarPicker(false);
    } catch (error) {
      console.error('Error actualizando avatar', error);
    }
  };

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
    <div className="profile-container">

      {/* Tarjeta de perfil */}
      {isEditing ? (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="d-flex align-items-start gap-4">
            <div className="profile-avatar-wrapper flex-shrink-0">
              <div className="profile-avatar">
                {user.profile_image
                  ? <img src={user.profile_image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : <i className="bi bi-person-fill" aria-hidden></i>
                }
              </div>
              <button className="profile-avatar-edit" aria-label="Cambiar avatar" onClick={() => setShowAvatarPicker(true)}>
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>
            <div className="flex-grow-1">
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold text-sm">Nombre</label>
                <input type="text" name="name" className="form-control shadow-none text-md" value={form.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold text-sm">Email</label>
                <input type="email" name="email" className="form-control shadow-none text-md" value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted fw-semibold text-sm">Biografía</label>
                <textarea name="bio" className="form-control shadow-none text-md profile-bio-textarea" rows={3} value={form.bio} onChange={handleChange} />
              </div>
              <div className="d-flex gap-2">
                <button className="btn-primary px-4" onClick={handleSave}>
                  <i className="bi bi-floppy me-2"></i>Guardar
                </button>
                <button className="btn-secondary px-4" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="d-flex align-items-center gap-4">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {user.profile_image
                  ? <img src={user.profile_image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : <i className="bi bi-person-fill" aria-hidden></i>
                }
              </div>
              <button className="profile-avatar-edit" aria-label="Cambiar avatar" onClick={() => setShowAvatarPicker(true)}>
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>
            <div>
              <h4 className="fw-bold text-heading mb-1">{user.name}</h4>
              <p className="text-muted text-sm mb-1">
                <i className="bi bi-envelope me-1"></i>{user.email}
              </p>
              <p className="text-muted text-sm mb-3">{form.bio}</p>
              <button className="btn-primary px-4" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-heading mb-0">Elige tu avatar</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowAvatarPicker(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {avatars.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Avatar ${i + 1}`}
                onClick={() => selectAvatar(url)}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%', cursor: 'pointer',
                  border: user.profile_image === url ? '3px solid var(--primary-accent, #e91e63)' : '3px solid transparent',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pedidos recibidos */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold text-heading mb-4">
          <i className="bi bi-bag-check text-primary-accent me-2" aria-hidden></i>
          Pedidos Recibidos
        </h5>
        {orders.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <div key={order.order_id} className="card border p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <span className="fw-semibold">Pedido #{order.order_id}</span>
                    <span className="text-muted text-sm ms-3">{order.customer}</span>
                    <span className="text-muted text-sm ms-2">
                      {new Date(order.date).toLocaleDateString('es-CL')}
                    </span>
                  </div>
                  <span className="text-primary-accent fw-bold">${Intl.NumberFormat('es-CL').format(order.total)}</span>
                </div>
                {order.items.map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-3 border-top py-2">
                    <img src={item.url_image} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-semibold text-sm">{item.name}</p>
                      <p className="mb-0 text-muted text-sm">x{item.amount}</p>
                    </div>
                    <span className="text-sm">${Intl.NumberFormat('es-CL').format(item.price * item.amount)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-bag profile-empty-icon mb-3" aria-hidden></i>
            <p className="text-muted text-md">Aún no hay pedidos recibidos.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminProfile;