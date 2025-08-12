import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [stats, setStats] = useState({
        estudiantes: 0,
        profesores: 0,
        cursos: 0
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Simular carga de datos del usuario
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Aquí podrías hacer una llamada a la API para obtener datos del usuario
        setUserData({
            nombre: 'Usuario',
            email: 'usuario@ejemplo.com',
            rol: 'Administrador'
        });

        // Simular estadísticas (en un caso real, esto vendría de la API)
        setStats({
            estudiantes: 150,
            profesores: 25,
            cursos: 45
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        navigate('/login');
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    if (!userData) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>🏫 Escuela</h2>
                    <p>Sistema de Gestión</p>
                </div>
                
                <nav className="sidebar-nav">
                    <Link 
                        to="/dashboard" 
                        className={`nav-item ${isActiveRoute('/dashboard') ? 'active' : ''}`}
                    >
                        📊 Dashboard
                    </Link>
                    <Link 
                        to="/estudiantes" 
                        className={`nav-item ${isActiveRoute('/estudiantes') ? 'active' : ''}`}
                    >
                        👥 Estudiantes
                    </Link>
                    <Link 
                        to="/profesores" 
                        className={`nav-item ${isActiveRoute('/profesores') ? 'active' : ''}`}
                    >
                        👨‍🏫 Profesores
                    </Link>
                    <Link 
                        to="/profile" 
                        className={`nav-item ${isActiveRoute('/profile') ? 'active' : ''}`}
                    >
                        👤 Perfil
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        🚪 Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <div className="user-info">
                        <span>Bienvenido, {userData.nombre}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">👥</div>
                            <div className="stat-info">
                                <h3>{stats.estudiantes}</h3>
                                <p>Estudiantes</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">👨‍🏫</div>
                            <div className="stat-info">
                                <h3>{stats.profesores}</h3>
                                <p>Profesores</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">📚</div>
                            <div className="stat-info">
                                <h3>{stats.cursos}</h3>
                                <p>Cursos</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <h2>Acciones Rápidas</h2>
                        <div className="actions-grid">
                            <Link to="/estudiantes" className="action-card">
                                <div className="action-icon">➕</div>
                                <h3>Agregar Estudiante</h3>
                                <p>Registrar nuevo estudiante</p>
                            </Link>
                            
                            <Link to="/profesores" className="action-card">
                                <div className="action-icon">➕</div>
                                <h3>Agregar Profesor</h3>
                                <p>Registrar nuevo profesor</p>
                            </Link>
                            
                            <Link to="/profile" className="action-card">
                                <div className="action-icon">⚙️</div>
                                <h3>Configuración</h3>
                                <p>Gestionar perfil</p>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="recent-activity">
                        <h2>Actividad Reciente</h2>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon">✅</div>
                                <div className="activity-content">
                                    <p>Nuevo estudiante registrado</p>
                                    <small>Hace 2 horas</small>
                                </div>
                            </div>
                            
                            <div className="activity-item">
                                <div className="activity-icon">📝</div>
                                <div className="activity-content">
                                    <p>Profesor actualizado</p>
                                    <small>Hace 4 horas</small>
                                </div>
                            </div>
                            
                            <div className="activity-item">
                                <div className="activity-icon">🔔</div>
                                <div className="activity-content">
                                    <p>Sistema actualizado</p>
                                    <small>Hace 1 día</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
