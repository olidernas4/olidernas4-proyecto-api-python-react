import React, { useState, useEffect } from 'react';
import { fetchProfesores } from './api';
import ProfesorForm from './components/ProfesorForm';
import ProfesorList from './components/ProfesorList';
import './styles/App.css';

function App() {
  const [profesores, setProfesores] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const loadProfesores = async () => {
      const data = await fetchProfesores();
      setProfesores(data);
    };
    loadProfesores();
  }, []);

  const handleProfesorUpdate = (updatedProfesor) => {
    setProfesores((prev) =>
      prev.map((profesor) => (profesor.id === updatedProfesor.id ? updatedProfesor : profesor))
    );
    setEditId(null);
  };

  const handleProfesorCreate = (newProfesor) => {
    setProfesores((prev) => [...prev, newProfesor]);
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    setProfesores((prev) => prev.filter((profesor) => profesor.id !== id));
  };

  return (
    <div className="App">
      <h1>Gestión de Profesores</h1>
      <ProfesorForm
        editId={editId}
        onCreate={handleProfesorCreate}
        onUpdate={handleProfesorUpdate}
      />
      <ProfesorList
        profesores={profesores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;