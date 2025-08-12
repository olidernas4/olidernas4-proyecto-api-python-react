import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        rol: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simular carga de datos del usuario
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Simular datos del usuario (en un caso real, esto vendría de la API)
        setUserData({
            nombre: 'Juan Pérez',
            email: 'juan.perez@ejemplo.com',
            telefono: '+1234567890',
            direccion: 'Calle Principal 123, Ciudad',
            rol: 'Administrador'
        });
        setLoading(false);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            // Aquí iría la llamada a la API para actualizar el perfil
            console.log('Guardando perfil:', userData);
            alert('Perfil actualizado exitosamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar el perfil');
        }
    };

    const handleCancel = () => {
        // Restaurar datos originales
        setUserData({
            nombre: 'Juan Pérez',
            email: 'juan.perez@ejemplo.com',
            telefono: '+1234567890',
            direccion: 'Calle Principal 123, Ciudad',
            rol: 'Administrador'
        });
        setIsEditing(false);
    };

    if (loading) {
        return <div className="loading">Cargando perfil...</div>;
    }

    return (
        <div className="profile-container">
            {/* Header con navegación */}
            <div className="profile-header">
                <Link to="/dashboard" className="back-btn">← Volver al Dashboard</Link>
                <h1>Mi Perfil</h1>
            </div>

            <div className="profile-content">
                {/* Información del perfil */}
                <div className="profile-section">
                    <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            {userData.nombre.charAt(0).toUpperCase()}
                        </div>
                        <h2>{userData.nombre}</h2>
                        <p className="user-role">{userData.rol}</p>
                    </div>

                    <div className="profile-actions">
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="edit-btn"
                            >
                                ✏️ Editar Perfil
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button onClick={handleSave} className="save-btn">
                                    💾 Guardar
                                </button>
                                <button onClick={handleCancel} className="cancel-btn">
                                    ❌ Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formulario de información */}
                <div className="profile-form">
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nombre"
                                value={userData.nombre}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        ) : (
                            <p className="form-value">{userData.nombre}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        ) : (
                            <p className="form-value">{userData.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Teléfono</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="telefono"
                                value={userData.telefono}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        ) : (
                            <p className="form-value">{userData.telefono}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Dirección</label>
                        {isEditing ? (
                            <textarea
                                name="direccion"
                                value={userData.direccion}
                                onChange={handleInputChange}
                                className="form-textarea"
                                rows="3"
                            />
                        ) : (
                            <p className="form-value">{userData.direccion}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Rol</label>
                        <p className="form-value role-badge">{userData.rol}</p>
                    </div>
                </div>

                {/* Sección de seguridad */}
                <div className="security-section">
                    <h3>🔒 Seguridad</h3>
                    <div className="security-options">
                        <button className="security-btn">
                            🔑 Cambiar Contraseña
                        </button>
                        <button className="security-btn">
                            📱 Autenticación de Dos Factores
                        </button>
                        <button className="security-btn">
                            📧 Notificaciones por Email
                        </button>
                    </div>
                </div>

                {/* Sección de actividad */}
                <div className="activity-section">
                    <h3>📊 Actividad Reciente</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🔐</div>
                            <div className="activity-content">
                                <p>Inicio de sesión exitoso</p>
                                <small>Hace 2 horas</small>
                            </div>
                        </div>
                        
                        <div className="activity-item">
                            <div className="activity-icon">📝</div>
                            <div className="activity-content">
                                <p>Perfil actualizado</p>
                                <small>Hace 1 día</small>
                            </div>
                        </div>
                        
                        <div className="activity-item">
                            <div className="activity-icon">👥</div>
                            <div className="activity-content">
                                <p>Nuevo estudiante agregado</p>
                                <small>Hace 3 días</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
