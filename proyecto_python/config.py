# import os

# class Config:
#     DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://olider:esuvejes1@localhost/escuela')
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # URL de conexión a la base de datos
    DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://olider:esuvejes1@localhost/escuela')
    
    # Clave secreta para firmar tokens JWT, utiliza una clave por defecto o carga desde las variables de entorno
    SECRET_KEY = os.getenv('SECRET_KEY', 'mi_clave_secreta')  # Cambia 'mi_clave_secreta' a una clave más segura
    ALGORITHM = 'HS256'  # Algoritmo para los JWT

    # Otras configuraciones que necesites
    # Por ejemplo, tiempo de expiración de los tokens
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

