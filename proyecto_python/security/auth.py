from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from db import get_db_connection

# Importa la configuración desde el archivo config.py
from config import Config

# Usar la configuración del archivo config.py
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = Config.SECRET_KEY  # Obtener la clave secreta de la configuración
ALGORITHM = Config.ALGORITHM  # Obtener el algoritmo de la configuración

# Función para obtener el usuario actual a partir del token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Decodificar el token usando la clave secreta y el algoritmo configurados
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        user_role_id = payload.get("rol_id")
        
        if user_email is None:
            raise HTTPException(status_code=401, detail="Credenciales inválidas")
        
        # Obtener información completa del usuario desde la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        
        try:
            # Consulta que incluye información del rol desde la tabla roles
            cur.execute('''
                SELECT u.id, u.nombre, u.apellido, u.correo, u.rol_id, r.nombre as rol_nombre 
                FROM usuarios u 
                LEFT JOIN roles r ON u.rol_id = r.id 
                WHERE u.correo = %s
            ''', (user_email,))
            user = cur.fetchone()
            
            if user is None:
                raise HTTPException(status_code=401, detail="Usuario no encontrado")
            
            return {
                "id": user['id'],
                "nombre": user['nombre'], 
                "apellido": user['apellido'],
                "correo": user['correo'],
                "rol_id": user['rol_id'],
                "rol_nombre": user['rol_nombre']
            }
        finally:
            cur.close()
            conn.close()
            
    except JWTError:
        raise HTTPException(status_code=401, detail="No autorizado")

# Dependencia para verificar si el usuario tiene un rol específico
def verificar_rol(rol_id: int):
    def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user["rol_id"] != rol_id:
            raise HTTPException(status_code=403, detail="Permiso denegado")
        return current_user
    return role_checker
