import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce.onrender.com';

const UserProfile = () => {
    const { user, token, updateProfile } = useUser();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || 'Amante de los tejidos artesanales',
    });
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    const avatars = [
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Felix',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Aneka',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sawyer',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Liam',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Valentina',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Emery',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ryan',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Maria',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Aidan',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Jameson',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Andrea',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Destiny',
        'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sophia',
    ];

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

    useEffect(() => {
        if (!token) return;
        const headers = { Authorization: `Bearer ${token}` };

        axios.get(`${API_URL}/users/me/favorites`, { headers })
            .then(res => setFavorites(res.data))
            .catch(err => console.error('Error cargando favoritos', err));

        axios.get(`${API_URL}/users/me/orders`, { headers })
            .then(res => setOrders(res.data))
            .catch(err => console.error('Error cargando pedidos', err));
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(`${API_URL}/users/me`, {
                name: form.name,
                email: form.email,
                profile_image: form.profile_image,
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
        setForm({ name: user.name, email: user.email, bio: user.bio || 'Amante de los tejidos artesanales' });
        setIsEditing(false);
    };

    const removeFavorite = async (productId) => {
        try {
            await axios.delete(`${API_URL}/users/me/favorites/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(prev => prev.filter(f => f.product_id !== productId));
        } catch (error) {
            console.error('Error eliminando favorito', error);
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
            {isEditing ? (
                <div className="card border-0 shadow-sm p-4 mb-4">
                    <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                        <div className="profile-avatar-wrapper flex-shrink-0 align-self-center">
                            <div className="profile-avatar">
                                {user.profile_image
                                    ? <img src={user.profile_image} alt="Avatar" className='img-profile' />
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
                                <textarea name="bio" className="form-control shadow-none text-md profile-bio-textarea" rows={3} style={{ resize: 'none' }} value={form.bio} onChange={handleChange} />
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
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar">
                                {user.profile_image
                                    ? <img src={user.profile_image} alt="Avatar" className='img-profile' />
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

            {/* Sección Favoritos */}
            <div className="card border-0 shadow-sm p-4 mb-4">
                <h5 className="fw-bold text-heading mb-4">
                    <i className="bi bi-heart text-primary-accent me-2" aria-hidden></i>
                    Mis Favoritos
                </h5>
                {favorites.length > 0 ? (
                    <div className="row g-3">
                        {favorites.map(fav => (
                            <div key={fav.product_id} className="col-6 col-md-4 col-lg-3">
                                <div className="card border-0 shadow-sm h-100">
                                    <img
                                        src={fav.url_image}
                                        alt={fav.name}
                                        className="card-img-top"
                                        style={{ height: '180px', objectFit: 'cover', borderRadius: '10px 10px 0 0', cursor: 'pointer' }}
                                        onClick={() => navigate(`/products/${fav.product_id}`)}
                                    />
                                    <div className="card-body d-flex flex-column p-3">
                                        <p
                                            className="fw-semibold mb-1"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/products/${fav.product_id}`)}
                                        >
                                            {fav.name}
                                        </p>
                                        <p className="text-primary-accent fw-bold mb-2">
                                            ${Intl.NumberFormat('es-CL').format(fav.price)}
                                        </p>
                                        <button
                                            className="btn-add-cart btn-sm w-100 mt-auto mb-2"
                                            onClick={() => {
                                                addToCart({ id: fav.product_id, name: fav.name, price: fav.price, image: fav.url_image });
                                            }}
                                        >
                                            <i className="bi bi-cart me-1"></i>Agregar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger w-100"
                                            onClick={() => removeFavorite(fav.product_id)}
                                        >
                                            <i className="bi bi-heart-fill me-1"></i>Quitar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="profile-empty-state">
                        <i className="bi bi-heart profile-empty-icon mb-3" aria-hidden></i>
                        <p className="text-muted text-md mb-3">Aún no tienes productos favoritos</p>
                        <button className="btn-primary px-4" onClick={() => navigate('/products')}>
                            Explorar Productos
                        </button>
                    </div>
                )}
            </div>

            {/* Sección Compras */}
            <div className="card border-0 shadow-sm p-4 mb-4">
                <h5 className="fw-bold text-heading mb-4">
                    <i className="bi bi-bag text-primary-accent me-2" aria-hidden></i>
                    Mis Compras
                </h5>
                {orders.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                        {orders.map(order => (
                            <div key={order.order_id} className="card border p-3">
                                <div className="d-flex flex-column flex-md-row justify-content-between mb-3 gap-1">
                                    <div>
                                        <span className="fw-semibold d-block d-md-inline">Pedido #{order.order_id}</span>
                                        <span className="text-muted text-sm ms-3">
                                            {new Date(order.date).toLocaleDateString('es-CL')}
                                        </span>
                                    </div>
                                    <span className="fw-bold">${Intl.NumberFormat('es-CL').format(order.total)}</span>
                                </div>
                                {order.items.map((item, i) => (
                                    <div key={i} className="d-flex align-items-center gap-3 border-top py-2">
                                        <img src={item.url_image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
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
                    <div className="profile-empty-state">
                        <i className="bi bi-bag profile-empty-icon mb-3" aria-hidden></i>
                        <p className="text-muted text-md mb-3">Aún no has realizado ninguna compra</p>
                        <button className="btn-primary px-4" onClick={() => navigate('/products')}>
                            Comenzar a Comprar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;