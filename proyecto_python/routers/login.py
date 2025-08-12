from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from db import get_db_connection
from bcrypt import checkpw
from config import Config  # Asegúrate de importar la clase Config
import logging

router = APIRouter()

# Usar las configuraciones de la clase Config
SECRET_KEY = Config.SECRET_KEY
ALGORITHM = Config.ALGORITHM

# Configurar logging
logging.basicConfig(level=logging.INFO)

# Ruta para iniciar sesión y obtener el token JWT
@router.post("/")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    logging.info(f"Request body: {await request.body()}")
    conn = None
    cur = None
    try:
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()

        # Consultar el usuario y su rol
        cur.execute(
            """ 
            SELECT u.*, r.nombre AS rol_nombre
            FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id  -- Usando rol_id aquí
            WHERE u.correo = %s
        """,
            (form_data.username,),
        )
        user = cur.fetchone()

        # Verificar si se encontró al usuario
        if not user:
            raise HTTPException(
                status_code=400, detail="Nombre de usuario o contraseña incorrectos"
            )

        # Verificar contraseña
        if not checkpw(
            form_data.password.encode("utf-8"), user["contrasena"].encode("utf-8")
        ):
            raise HTTPException(status_code=400, detail=" contraseña incorrecta")

        # Crear token JWT
        token_data = {"sub": user["correo"], "rol": user["rol_nombre"]}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    except HTTPException:
        raise  # Relevamos el error específico
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al iniciar sesión: {e}")
    finally:
        # Cerramos el cursor y la conexión
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()

    return {"access_token": token, "token_type": "bearer"}