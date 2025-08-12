import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Crear el body en formato x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append('username', correo); // 'username' es el campo esperado por OAuth2PasswordRequestForm
            formData.append('password', contrasena); // 'password' es el campo esperado por OAuth2PasswordRequestForm

            console.log('Intentando conectar a:', '/auth/login');
            console.log('Datos enviados:', { username: correo, password: contrasena.substring(0, 3) + '***' });
            
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData, // Utilizar el formData en lugar de JSON.stringify
                mode: 'cors', // Especificar modo CORS
            });

            if (response.ok) {
                const data = await response.json();
                // Manejar el login exitoso - guardar token
                console.log('Login exitoso:', data);
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_type', data.token_type);
                    alert('¡Login exitoso! Bienvenido al sistema.');
                    navigate('/dashboard'); // Redirigir al dashboard después del login
                } else {
                    alert('Login exitoso pero no se recibió token');
                }
            } else {
                const errorData = await response.json();
                console.error('Error de respuesta:', errorData);
                console.error('Status:', response.status);
                console.error('Status Text:', response.statusText);
                alert(`Error: ${errorData.detail || 'Error desconocido'} (Status: ${response.status})`);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert(`Error de conexión: ${error.message}. Verifica que el backend esté ejecutándose en http://localhost:8000`);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
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
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
