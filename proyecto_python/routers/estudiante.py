# routers/estudiante.py
from fastapi import APIRouter, HTTPException
from models.estudiante import Estudiante
from db import get_db_connection
from typing import List
import json

router = APIRouter()

# Ruta para crear un nuevo estudiante
@router.post("/create/", response_model=Estudiante)
def create_estudiante(estudiante: Estudiante):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si el estudiante ya existe por correo
        cur.execute('SELECT id FROM estudiantes WHERE correo = %s', (estudiante.correo,))
        existing = cur.fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Ya existe un estudiante con este correo")
        
        # Insertar el nuevo estudiante
        cur.execute(
            'INSERT INTO estudiantes (nombre, apellido, correo, edad, direccion) VALUES (%s, %s, %s, %s, %s) RETURNING id, nombre, apellido, correo, edad, direccion',
            (estudiante.nombre, estudiante.apellido, estudiante.correo, estudiante.edad, estudiante.direccion)
        )
        new_estudiante_data = cur.fetchone()
        conn.commit()
        
        if new_estudiante_data is None:
            raise HTTPException(status_code=400, detail="Error al crear el estudiante")
        
        # Crear objeto Estudiante con los datos retornados
        new_estudiante = Estudiante(
            id=new_estudiante_data[0],
            nombre=new_estudiante_data[1],
            apellido=new_estudiante_data[2],
            correo=new_estudiante_data[3],
            edad=new_estudiante_data[4],
            direccion=new_estudiante_data[5]
        )
        
        return new_estudiante
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error al crear el estudiante: {str(e)}")
    finally:
        cur.close()
        conn.close()

# Ruta para obtener todos los estudiantes
@router.get("/estudiante_view", response_model=List[Estudiante])
def get_estudiantes():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, nombre, apellido, correo, edad, direccion FROM estudiantes ORDER BY id')
        estudiantes_data = cur.fetchall()
        
        # Convertir los datos a objetos Estudiante
        estudiantes = []
        for row in estudiantes_data:
            estudiante = Estudiante(
                id=row[0],
                nombre=row[1],
                apellido=row[2],
                correo=row[3],
                edad=row[4],
                direccion=row[5]
            )
            estudiantes.append(estudiante)
        
        return estudiantes
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los estudiantes: {str(e)}")
    finally:
        cur.close()
        conn.close()

# Ruta para obtener un estudiante por ID
@router.get("/{id}", response_model=Estudiante)
def get_estudiante(id: int):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, nombre, apellido, correo, edad, direccion FROM estudiantes WHERE id = %s', (id,))
        estudiante_data = cur.fetchone()
        
        if estudiante_data is None:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        
        estudiante = Estudiante(
            id=estudiante_data[0],
            nombre=estudiante_data[1],
            apellido=estudiante_data[2],
            correo=estudiante_data[3],
            edad=estudiante_data[4],
            direccion=estudiante_data[5]
        )
        
        return estudiante
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener el estudiante: {str(e)}")
    finally:
        cur.close()
        conn.close()

# Ruta para actualizar la información de un estudiante por su ID
@router.put("/update/{id}", response_model=Estudiante)
def update_estudiante(id: int, estudiante: Estudiante):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si el estudiante existe
        cur.execute('SELECT id FROM estudiantes WHERE id = %s', (id,))
        existing = cur.fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        
        # Verificar si el correo ya existe en otro estudiante
        cur.execute('SELECT id FROM estudiantes WHERE correo = %s AND id != %s', (estudiante.correo, id))
        duplicate = cur.fetchone()
        if duplicate:
            raise HTTPException(status_code=400, detail="Ya existe otro estudiante con este correo")
        
        # Actualizar el estudiante
        cur.execute(
            'UPDATE estudiantes SET nombre = %s, apellido = %s, correo = %s, edad = %s, direccion = %s WHERE id = %s RETURNING id, nombre, apellido, correo, edad, direccion',
            (estudiante.nombre, estudiante.apellido, estudiante.correo, estudiante.edad, estudiante.direccion, id)
        )
        updated_estudiante_data = cur.fetchone()
        conn.commit()
        
        if updated_estudiante_data is None:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        
        updated_estudiante = Estudiante(
            id=updated_estudiante_data[0],
            nombre=updated_estudiante_data[1],
            apellido=updated_estudiante_data[2],
            correo=updated_estudiante_data[3],
            edad=updated_estudiante_data[4],
            direccion=updated_estudiante_data[5]
        )
        
        return updated_estudiante
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error al actualizar el estudiante: {str(e)}")
    finally:
        cur.close()
        conn.close()

# Ruta para eliminar un estudiante por su ID
@router.delete("/delete/{id}")
def delete_estudiante(id: int):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si el estudiante existe
        cur.execute('SELECT id FROM estudiantes WHERE id = %s', (id,))
        existing = cur.fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        
        # Eliminar el estudiante
        cur.execute('DELETE FROM estudiantes WHERE id = %s', (id,))
        conn.commit()
        
        return {"message": "Estudiante eliminado exitosamente", "id": id}
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error al eliminar el estudiante: {str(e)}")
    finally:
        cur.close()
        conn.close()