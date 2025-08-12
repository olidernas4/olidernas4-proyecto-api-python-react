# routers/profesores.py
from fastapi import APIRouter, HTTPException
from db import get_db_connection
from models.profesores import Profesor

router = APIRouter()

# Ruta para crear un nuevo profesor
@router.post("/profesores_create/")
def create_profesor(profesor: Profesor):
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si el email ya existe en la base de datos
        cur.execute('SELECT * FROM profesores WHERE email = %s', (profesor.email,))
        existing_profesor = cur.fetchone()
        if existing_profesor:
            raise HTTPException(status_code=400, detail="El correo ya está registrado")
        
        # Insertar nuevo profesor en la base de datos
        cur.execute('INSERT INTO profesores (nombre, apellido, email) VALUES (%s, %s, %s) RETURNING *',
                    (profesor.nombre, profesor.apellido, profesor.email))
        new_profesor = cur.fetchone()
        conn.commit()
        
    except HTTPException:
        # Relevamos el error específico
        raise 
    except Exception as e:
        # Manejamos cualquier otro error
        raise HTTPException(status_code=500, detail=f"Error al crear el profesor: {e}")
    finally:
        # Cerramos el cursor y la conexión
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return new_profesor

# Ruta para obtener todos los profesores
@router.get("/profesores_get/")
def get_profesores():
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM profesores')
        profesores = cur.fetchall()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los profesores: {e}")
    finally:
        # Cerramos el cursor y la conexión
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return profesores

# Ruta para actualizar la información de un profesor por su ID
@router.put("/profesores_update/{id}")
def update_profesor(id: int, profesor: Profesor):
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('UPDATE profesores SET nombre = %s, apellido = %s, email = %s WHERE id = %s RETURNING *',
                    (profesor.nombre, profesor.apellido, profesor.email, id))
        updated_profesor = cur.fetchone()
        conn.commit()

        if updated_profesor is None:
            raise HTTPException(status_code=404, detail="Profesor no encontrado")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar el profesor: {e}")
    finally:
        # Cerramos el cursor y la conexión
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return updated_profesor

# Ruta para eliminar un profesor por su ID
@router.delete("/profesores_delete/{id}")
def delete_profesor(id: int):
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM profesores WHERE id = %s RETURNING *', (id,))
        deleted_profesor = cur.fetchone()
        conn.commit()

        if deleted_profesor is None:
            raise HTTPException(status_code=404, detail="Profesor no encontrado")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar el profesor: {e}")
    finally:
        # Cerramos el cursor y la conexión
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return {"message": "Profesor eliminado"}
