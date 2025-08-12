import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfesoresManager.css';

const ProfesoresManager = () => {
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProfesor, setEditingProfesor] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        especialidad: ''
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('access_token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    useEffect(() => {
        fetchProfesores();
    }, []);

    const fetchProfesores = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('No hay token de acceso. Por favor, inicia sesión.');
            return;
        }

        setLoading(true);
        try {
            console.log('Intentando conectar a:', '/profesores/profesores_get/');
            const response = await fetch('/profesores/profesores_get/', {
                headers: getAuthHeaders()
            });

            console.log('Respuesta del servidor:', response.status, response.statusText);

            if (response.ok) {
                const data = await response.json();
                setProfesores(data);
                console.log('Profesores obtenidos:', data);
            } else {
                console.error('Error del servidor:', response.status, response.statusText);
                // Mostrar error específico del backend
                try {
                const errorData = await response.json();
                    console.error('Detalle del error:', errorData);
                    
                    alert(`Error del backend: ${errorData.detail || 'Error desconocido'} (Status: ${response.status})`);
                } catch (parseError) {
                    alert(`Error del backend: ${response.status} ${response.statusText}`);
                }
                setProfesores([]);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert(`Error de conexión: ${error.message}`);
            setProfesores([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.especialidad) {
            alert('Por favor completa los campos obligatorios');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('No hay token de acceso. Por favor, inicia sesión.');
            return;
        }

        try {
            const response = await fetch('/profesores/profesores_create/', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newProfesor = await response.json();
                alert('Profesor creado exitosamente');
                setFormData({
                    nombre: '',
                    apellido: '',
                    email: '',
                    especialidad: ''
                });
                setShowForm(false);
                fetchProfesores();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || 'No se pudo crear el profesor'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error de conexión: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
            return;
        }

        try {
            const response = await fetch(`/profesores/profesores_delete/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                alert('Profesor eliminado exitosamente');
                fetchProfesores();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || 'No se pudo eliminar el profesor'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error de conexión: ${error.message}`);
        }
    };

    const handleUpdate = async (profesor) => {
        console.log('🔍 Profesor recibido para editar:', profesor);
        console.log('🔍 ID del profesor:', profesor?.id);
        console.log('🔍 Campos del profesor:', {
            nombre: profesor?.nombre,
            apellido: profesor?.apellido,
            correo: profesor?.correo,
            especialidad: profesor?.especialidad
        });
        
        if (!profesor?.id) {
            alert('❌ Error: No se pudo obtener el ID del profesor. Contacta al administrador.');
            return;
        }
        
        setEditingProfesor(profesor);
        setFormData({
            nombre: profesor.nombre || '',
            apellido: profesor.apellido || '',
            email: profesor.email || '',
            especialidad: profesor.especialidad || ''
        });
        setShowEditForm(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.especialidad) {
            alert('Por favor completa los campos obligatorios');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('No hay token de acceso. Por favor, inicia sesión.');
            return;
        }

        try {
            console.log('Actualizando profesor:', editingProfesor.id);
            console.log('Datos a enviar:', formData);
            
            const response = await fetch(`/profesores/profesores_update/${editingProfesor.id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedProfesor = await response.json();
                console.log('Profesor actualizado:', updatedProfesor);
                alert('Profesor actualizado exitosamente');
                setShowEditForm(false);
                setEditingProfesor(null);
                setFormData({
                    nombre: '',
                    apellido: '',
                    email: '',
                    especialidad: ''
                });
                fetchProfesores();
            } else {
                try {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.detail || 'No se pudo actualizar el profesor'}`);
                } catch (parseError) {
                    alert('Error al actualizar el profesor. Inténtalo de nuevo.');
                }
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert(`Error de conexión: ${error.message}`);
        }
    };

    // Filtrado y paginación
    const filteredProfesores = profesores.filter(profesor =>
        profesor.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profesor.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profesor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profesor.especialidad?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProfesores = filteredProfesores.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProfesores.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="profesores-container">
            {/* Header */}
            <div className="profesores-header">
                <Link to="/dashboard" className="back-btn">← Volver al Dashboard</Link>
                <h1>Gestión de Profesores</h1>
            </div>

            {/* Controles */}
            <div className="profesores-controls">
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Buscar profesores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="actions-section">
                <button 
                    onClick={fetchProfesores} 
                    disabled={loading}
                        className="refresh-btn"
                >
                        {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
                </button>
                
                <button 
                        onClick={() => setShowForm(!showForm)}
                        className="add-btn"
                >
                        {showForm ? '❌ Cancelar' : '➕ Agregar Profesor'}
                </button>
                </div>
            </div>

            {/* Formulario de creación */}
            {showForm && (
                <div className="form-container">
                    <h3>Nuevo Profesor</h3>
                    <form onSubmit={handleSubmit} className="profesor-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre *</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido *</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Especialidad *</label>
                                <input
                                    type="text"
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                💾 Guardar Profesor
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Formulario de edición */}
            {showEditForm && (
                <div className="form-container">
                    <h3>Editar Profesor: {editingProfesor?.nombre} {editingProfesor?.apellido}</h3>
                    <form onSubmit={handleEditSubmit} className="profesor-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre *</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido *</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Especialidad *</label>
                                <input
                                    type="text"
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="button" onClick={() => {
                                setShowEditForm(false);
                                setEditingProfesor(null);
                                setFormData({
                                    nombre: '',
                                    apellido: '',
                                    email: '',
                                    especialidad: ''
                                });
                            }} className="cancel-btn">
                                ❌ Cancelar
                            </button>
                            <button type="submit" className="submit-btn">
                                💾 Actualizar Profesor
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de profesores */}
            <div className="profesores-list">
                <div className="list-header">
                    <h3>Profesores ({filteredProfesores.length})</h3>
                </div>

                {currentProfesores.length > 0 ? (
                    <div className="profesores-grid">
                        {currentProfesores.map((profesor, index) => (
                            <div key={profesor.id || index} className="profesor-card">
                                <div className="profesor-avatar">
                                    {profesor.nombre?.charAt(0).toUpperCase()}
                                </div>
                                <div className="profesor-info">
                                    <h4>{profesor.nombre} {profesor.apellido}</h4>
                                    <p className="profesor-email">{profesor.email}</p>
                                    {profesor.especialidad && (
                                        <p className="profesor-specialty">📚 {profesor.especialidad}</p>
                                    )}
                                    {profesor.id && (
                                        <p className="profesor-id">ID: {profesor.id}</p>
                                    )}
                                </div>
                                <div className="profesor-actions">
                                    <button 
                                        onClick={() => handleUpdate(profesor)}
                                        className="edit-btn"
                                    >
                                        ✏️
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(profesor.id)}
                                        className="delete-btn"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No se encontraron profesores</p>
                    </div>
                )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-btn"
                    >
                        ← Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`page-btn ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-btn"
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfesoresManager;
