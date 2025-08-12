import React from 'react';
import ProfesorItem from './ProfesorItem';

const ProfesorList = ({ profesores, onEdit, onDelete }) => {
  return (
    <ul className="profesor-list">
      {profesores.map((profesor) => (
        <ProfesorItem 
          key={profesor.id} 
          profesor={profesor} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
};

export default ProfesorList;