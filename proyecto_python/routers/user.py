from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from db import get_db_connection
from security.tokens import create_access_token
from security.auth import get_current_user, verificar_rol
from passlib.context import CryptContext  # Importar CryptContext para la verificación de contraseñas

router = APIRouter()

# Configuración para JWT
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Contexto de encriptación para verificar contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Verificación de contraseña hasheada
def verificar_contrasena(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Ruta para iniciar sesión
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Verificar si el correo existe
        cur.execute('SELECT * FROM usuarios WHERE correo = %s', (form_data.username,))
        user = cur.fetchone()
        
        if user is None or not verificar_contrasena(form_data.password, user['contrasena']):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Crear token JWT
        token_data = {
            "sub": user['correo'],
            "rol_id": user['rol_id']
        }
        access_token = create_access_token(data=token_data, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        
        return {"access_token": access_token, "token_type": "bearer"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al iniciar sesión: {e}")
    finally:
        # Cerrar el cursor y la conexión si fueron creados
        cur.close()
        conn.close()

# Ruta para obtener información del usuario actual
@router.get("/usuarios/me", dependencies=[Depends(get_current_user)])
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

# Ruta solo accesible para administradores (rol_id = 1)
@router.get("/usuarios/admin", dependencies=[Depends(verificar_rol(1))])
def read_admin_data(current_user: dict = Depends(get_current_user)):
    return {"message": "Datos de administrador", "usuario": current_user}

# Ruta solo accesible para profesores (rol_id = 2)
@router.get("/usuarios/profesor", dependencies=[Depends(verificar_rol(2))])
def read_profesor_data(current_user: dict = Depends(get_current_user)):
    return {"message": "Datos de profesor", "usuario": current_user}

# Ruta solo accesible para estudiantes (rol_id = 3)
@router.get("/usuarios/estudiante", dependencies=[Depends(verificar_rol(3))])
def read_estudiante_data(current_user: dict = Depends(get_current_user)):
    return {"message": "Datos de estudiante", "usuario": current_user}
