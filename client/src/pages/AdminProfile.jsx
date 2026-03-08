import { useState } from 'react';
import { useUser } from '../context/UserContext';

const mockOrders = [
  { id: 101, customer: 'Katherin Hernández', total: 170, status: 'Pagado' },
  { id: 102, customer: 'Juan Pérez', total: 55, status: 'Pendiente' },
  { id: 103, customer: 'María López', total: 230, status: 'Pagado' },
  { id: 104, customer: 'Carlos Gómez', total: 90, status: 'Cancelado' },
];

const statusClass = {
  Pagado: 'status-pagado',
  Pendiente: 'status-pendiente',
  Cancelado: 'status-cancelado',
};

const mockAdmin = { name: 'Administrador', email: 'admin@kathywool.com', role: 'Administrador' };

const AdminProfile = () => {
  const { getProfile, updateProfile } = useUser();
  const user = getProfile();

  const activeUser = user || mockAdmin;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: activeUser.name,
    email: activeUser.email || '',
    bio: activeUser.bio || 'Administrador de kathyWool',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    updateProfile(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: activeUser.name, email: activeUser.email || '', bio: activeUser.bio || 'Administrador de kathyWool' });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">

      {/* Tarjeta de perfil */}
      {isEditing ? (
        <div className="card border-0  shadow-sm p-4 mb-4">
          <div className="d-flex gap-4">
            <div className="profile-avatar-wrapper flex-shrink-0">
              <div className="profile-avatar">
                <i className="bi bi-person-fill" aria-hidden></i>
              </div>
              <button className="profile-avatar-edit" aria-label="Cambiar foto">
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
                <i className="bi bi-person-fill" aria-hidden></i>
              </div>
              <button className="profile-avatar-edit" aria-label="Cambiar foto">
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>
            <div>
              <h4 className="fw-bold text-heading mb-1">{activeUser.name}</h4>
              <p className="text-muted text-sm mb-1">
                <i className="bi bi-envelope me-1"></i>{activeUser.email}
              </p>
              <p className="text-muted text-sm mb-3">{form.bio}</p>
              <button className="btn-primary px-4" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pedidos recibidos */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold text-heading mb-4">
          <i className="bi bi-bag-check text-primary-accent me-2" aria-hidden></i>
          Pedidos Recibidos
        </h5>
        {mockOrders.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-bag profile-empty-icon mb-3" aria-hidden></i>
            <p className="text-muted text-md">Aún no hay pedidos recibidos.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th># Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="text-muted text-sm">#{order.id}</td>
                  <td className="fw-semibold">{order.customer}</td>
                  <td className="text-primary-accent fw-bold">${order.total}</td>
                  <td>
                    <span className={`status-badge ${statusClass[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminProfile;