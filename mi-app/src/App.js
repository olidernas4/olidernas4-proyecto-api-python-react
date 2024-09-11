import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [profesores, setProfesores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    const response = await axios.get('http://127.0.0.1:8000/profesores/');
    setProfesores(response.data);
  };

  const createProfesor = async () => {
    await axios.post('http://127.0.0.1:8000/profesores/', { nombre, apellido, email });
    fetchProfesores();
    setNombre('');
    setApellido('');
    setEmail('');
  };

  const updateProfesor = async () => {
    await axios.put(`http://127.0.0.1:8000/profesores/${editId}`, { nombre, apellido, email });
    fetchProfesores();
    setNombre('');
    setApellido('');
    setEmail('');
    setEditId(null);
  };

  const deleteProfesor = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/profesores/${id}`);
    fetchProfesores();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateProfesor();
    } else {
      createProfesor();
    }
  };

  const handleEdit = (profesor) => {
    setNombre(profesor.nombre);
    setApellido(profesor.apellido);
    setEmail(profesor.email);
    setEditId(profesor.id);
  };

  return (
    <div className="App">
      <h1>Gestión de Profesores</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <ul>
        {profesores.map((profesor) => (
          <li key={profesor.id}>
            {profesor.nombre} {profesor.apellido} ({profesor.email})
            <button onClick={() => handleEdit(profesor)}>Editar</button>
            <button onClick={() => deleteProfesor(profesor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

