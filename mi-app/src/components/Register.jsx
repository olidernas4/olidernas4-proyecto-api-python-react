// src/components/Register.js
import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('Estudiante');

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            // Mapear rol a rol_id según tu API
            const rol_id = rol === 'Estudiante' ? 2 : 1; // Ajusta según tu base de datos
            
            const response = await fetch('/usuarios/registro/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    nombre, 
                    apellido, 
                    correo, 
                    contrasena, 
                    rol_id 
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Registro exitoso:', data);
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_type', data.token_type);
                    alert('Registro exitoso! Token guardado.');
                } else {
                    alert('Registro exitoso');
                }
            } else {
                const errorData = await response.json();
                console.error('Error de registro:', errorData);
                alert(`Error en el registro: ${errorData.detail || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert(`Error de conexión: ${error.message}`);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Registro</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor">Profesor</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
