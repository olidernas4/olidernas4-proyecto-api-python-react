from datetime import datetime, timedelta
from jose import jwt
from config import Config  # Importar la clase Config en lugar de las variables directamente

# Usar las configuraciones de la clase Config
SECRET_KEY = Config.SECRET_KEY
ALGORITHM = Config.ALGORITHM

# Función para crear un token JWT
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
