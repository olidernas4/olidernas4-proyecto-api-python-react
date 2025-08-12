# routers/asignacion.py
from fastapi import APIRouter, HTTPException
from db import get_db_connection
from models.asignacion import Asignacion

router = APIRouter()


# El objeto cursor en Python es una interfaz que permite interactuar con la base de datos a través de la conexión establecida. Aquí está el paso a paso de cómo funciona:
# Ruta para crear una nueva asignación
@router.post("/asignacion_create/")
def create_asignacion(asignacion: Asignacion):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO asignacion (estudiante_id, estudio_id, fecha_inscripcion) VALUES (%s, %s, %s) RETURNING *',
                    (asignacion.estudiante_id, asignacion.estudio_id, asignacion.fecha_inscripcion))
        new_asignacion = cur.fetchone()
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la asignación: {e}")
    finally:
        cur.close()
        conn.close()
    return new_asignacion

# Ruta para obtener todas las asignaciones
@router.get("/asignacion_get/")
def get_asignaciones():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM asignacion')
        asignaciones = cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener las asignaciones: {e}")
    finally:
        cur.close()
        conn.close()
    return asignaciones

# Ruta para actualizar la información de una asignación por su ID
@router.put("/asignacion_update/{id}")
def update_asignacion(id: int, asignacion: Asignacion):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('UPDATE asignacion SET estudiante_id = %s, estudio_id = %s, fecha_inscripcion = %s WHERE id = %s RETURNING *',
                    (asignacion.estudiante_id, asignacion.estudio_id, asignacion.fecha_inscripcion, id))
        updated_asignacion = cur.fetchone()
        conn.commit()
        if updated_asignacion is None:
            raise HTTPException(status_code=404, detail="Asignación no encontrada")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la asignación: {e}")
    finally:
        cur.close()
        conn.close()
    return updated_asignacion

# Ruta para eliminar una asignación por su ID
@router.delete("/asignacion_delete/{id}")
def delete_asignacion(id: int):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM asignacion WHERE id = %s RETURNING *', (id,))
        deleted_asignacion = cur.fetchone()
        conn.commit()
        if deleted_asignacion is None:
            raise HTTPException(status_code=404, detail="Asignación no encontrada")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la asignación: {e}")
    finally:
        cur.close()
        conn.close()
    return {"message": "Asignación eliminada"}
