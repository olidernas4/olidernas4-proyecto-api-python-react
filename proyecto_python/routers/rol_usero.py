from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext

from db import get_db_connection
from models.rol_user import Usuario  # Asegúrate de que el modelo Usuario esté definido correctamente

# Contexto de encriptación para las contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

# Ruta para registrar un nuevo usuario
@router.post("/registro/")
def registrar_usuario(usuario: Usuario):
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()

        # Verificar si el correo ya está registrado
        cur.execute('SELECT * FROM usuarios WHERE correo = %s', (usuario.correo,))
        existing_user = cur.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo ya está registrado")

        # Encriptar la contraseña antes de guardarla
        hashed_password = pwd_context.hash(usuario.contrasena)

        # Insertar nuevo usuario con rol_id en la base de datos
        cur.execute(
            'INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id) VALUES (%s, %s, %s, %s, %s) RETURNING *',
            (usuario.nombre, usuario.apellido, usuario.correo, hashed_password, usuario.rol_id)
        )
        new_usuario = cur.fetchone()
        conn.commit()
        
    except HTTPException:
        # Relevamos el error específico
        raise
    except Exception as e:
        # Manejamos cualquier otro error
        raise HTTPException(status_code=500, detail=f"Error al registrar el usuario: {e}")
    finally:
        # Cerramos el cursor y la conexión si fueron creados
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return new_usuario
