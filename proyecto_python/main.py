from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator 
import psycopg2
from psycopg2.extras import RealDictCursor
from config import Config


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Inicialización de la aplicación FastAPI
app = FastAPI()

# Configuración de CORS para permitir solicitudes desde cualquier origen
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Permite todas las orígenes
#     allow_credentials=True,
#     allow_methods=["*"],  # Permite todos los métodos HTTP
#     allow_headers=["*"],  # Permite todos los encabezados
# )

# # Función para obtener la conexión a la base de datos
# def get_db_connection():
#     try:
#         # Conectar a la base de datos usando psycopg2
#         conn = psycopg2.connect(Config.DATABASE_URI, cursor_factory=RealDictCursor)
#         return conn
#     except Exception as e:
#         # Manejo de excepciones en caso de error en la conexión
#         raise HTTPException(status_code=500, detail=f"Error de conexión a la base de datos: {str(e)}")

# # Modelo para el Profesor
# class Profesor(BaseModel):
#     nombre: str
#     apellido: str
#     email: str

#     # Validador para el campo email
#     @validator('email')
#     def validar_email(cls, v):
#         # Verificar si el email contiene "@" y un dominio
#         if "@" not in v or "." not in v:
#             raise ValueError('El correo debe ser válido')
#         return v

# # Ruta para crear un nuevo profesor
# @app.post("/profesores/")
# def create_profesor(profesor: Profesor):
#     conn = get_db_connection()
#     cur = conn.cursor()
    
#     # Verificar si el email ya existe en la base de datos
#     cur.execute('SELECT * FROM profesores WHERE email = %s', (profesor.email,))
#     existing_profesor = cur.fetchone()
#     if existing_profesor:
#         raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
#     # Insertar nuevo profesor en la base de datos
#     cur.execute('INSERT INTO profesores (nombre, apellido, email) VALUES (%s, %s, %s) RETURNING *',
#                 (profesor.nombre, profesor.apellido, profesor.email))
#     new_profesor = cur.fetchone()
#     conn.commit()
#     cur.close()
#     conn.close()
#     return new_profesor

# # Ruta para obtener todos los profesores
# @app.get("/profesores/")
# def get_profesores():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('SELECT * FROM profesores')
#     profesores = cur.fetchall()
#     cur.close()
#     conn.close()
#     return profesores

# # Ruta para actualizar la información de un profesor por su ID
# @app.put("/profesores/{id}")
# def update_profesor(id: int, profesor: Profesor):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('UPDATE profesores SET nombre = %s, apellido = %s, email = %s WHERE id = %s RETURNING *',
#                 (profesor.nombre, profesor.apellido, profesor.email, id))
#     updated_profesor = cur.fetchone()
#     conn.commit()
#     cur.close()
#     conn.close()
#     if updated_profesor is None:
#         raise HTTPException(status_code=404, detail="Profesor no encontrado")
#     return updated_profesor

# # Ruta para eliminar un profesor por su ID
# @app.delete("/profesores/{id}")
# def delete_profesor(id: int):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('DELETE FROM profesores WHERE id = %s RETURNING *', (id,))
#     deleted_profesor = cur.fetchone()
#     conn.commit()
#     cur.close()
#     conn.close()
#     if deleted_profesor is None:
#         raise HTTPException(status_code=404, detail="Profesor no encontrado")
#     return {"message": "Profesor eliminado"}





# app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las orígenes, puedes restringirlo según tus necesidades
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    conn = psycopg2.connect(Config.DATABASE_URI, cursor_factory=RealDictCursor)
    return conn

class Profesor(BaseModel):
    nombre: str
    apellido: str
    email: str

@app.post("/profesores/")
def create_profesor(profesor: Profesor):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO profesores (nombre, apellido, email) VALUES (%s, %s, %s) RETURNING *',
                (profesor.nombre, profesor.apellido, profesor.email))
    new_profesor = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return new_profesor

@app.get("/profesores/")
def get_profesores():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM profesores')
    profesores = cur.fetchall()
    cur.close()
    conn.close()
    return profesores

@app.put("/profesores/{id}")
def update_profesor(id: int, profesor: Profesor):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE profesores SET nombre = %s, apellido = %s, email = %s WHERE id = %s RETURNING *',
                (profesor.nombre, profesor.apellido, profesor.email, id))
    updated_profesor = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if updated_profesor is None:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    return updated_profesor

@app.delete("/profesores/{id}")
def delete_profesor(id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM profesores WHERE id = %s RETURNING *', (id,))
    deleted_profesor = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if deleted_profesor is None:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    return {"message": "Profesor eliminado"}