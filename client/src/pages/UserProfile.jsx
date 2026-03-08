import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { getProfile, updateProfile } = useUser();
    const navigate = useNavigate();
    const user = getProfile();

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || 'Amante de los tejidos artesanales',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateProfile(form);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm({ name: user.name, email: user.email, bio: user.bio || 'Amante de los tejidos artesanales' });
        setIsEditing(false);
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
        <div className="profile-container mt-4">
            {isEditing ? (
                <div className="card border-0 shadow-sm p-4 mb-4">
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
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control shadow-none text-md"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted fw-semibold text-sm">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control shadow-none text-md"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-muted fw-semibold text-sm">Biografía</label>
                                <textarea
                                    name="bio"
                                    className="form-control shadow-none text-md"
                                    rows={3}
                                    style={{ resize: 'none' }}
                                    value={form.bio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn-primary px-4" onClick={handleSave}>
                                    <i className="bi bi-floppy me-2"></i>Guardar
                                </button>
                                <button className="btn-secondary px-4" onClick={handleCancel}>
                                    Cancelar
                                </button>
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