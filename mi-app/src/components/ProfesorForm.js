import React, { useState, useEffect } from 'react';

const ProfesorForm = ({ onSubmit, initialData }) => {
  const [nombre, setNombre] = useState(initialData ? initialData.nombre : '');
  const [apellido, setApellido] = useState(initialData ? initialData.apellido : '');
  const [correo, setCorreo] = useState(initialData ? initialData.correo : '');
  const [especialidad, setEspecialidad] = useState(initialData ? initialData.especialidad : '');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setApellido(initialData.apellido);
      setCorreo(initialData.correo);
      setEspecialidad(initialData.especialidad);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, apellido, correo, especialidad });
    setNombre('');
    setApellido('');
    setCorreo('');
  };

  return (
    <form onSubmit={handleSubmit} className="profesor-form">
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
        type="correo"
        placeholder="correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="especialidad"
        placeholder="especialidad"
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
        required
      />


      <button type="submit">{initialData ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default ProfesorForm;