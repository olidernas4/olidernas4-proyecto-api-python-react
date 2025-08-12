import React from 'react';

const ProfesorItem = ({ profesor, onEdit, onDelete }) => {
  return (
    <li className="profesor-item">
      {profesor.nombre} {profesor.apellido} ({profesor.correo}) - {profesor.especialidad}
      <button onClick={() => onEdit(profesor)}>Editar</button>
      <button onClick={() => onDelete(profesor.id)}>Eliminar</button>
    </li>
  );
};

export default ProfesorItem;