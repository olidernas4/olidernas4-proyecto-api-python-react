import psycopg2
from psycopg2.extras import RealDictCursor
from config import Config

def get_db_connection():
    """
    Función para obtener una conexión a la base de datos PostgreSQL
    """
    try:
        connection = psycopg2.connect(
            Config.DATABASE_URI,
            cursor_factory=RealDictCursor
        )
        return connection
    except psycopg2.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None
