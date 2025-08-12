from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers.login import router as login_router 
from routers.rol_usero import router as rol_user
from routers.user import router as user_router  
from routers import asignacion, estudiante, estudio, profesores 
from db import get_db_connection

# Crear la aplicación FastAPI
app = FastAPI(
    title="API Escuela",
    description="API para gestión escolar",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar los routers
app.include_router(estudiante.router, prefix="/estudiantes", tags=["Estudiantes"])
app.include_router(profesores.router, prefix="/profesores", tags=["Profesores"])
app.include_router(estudio.router, prefix="/estudios", tags=["Estudios"])
app.include_router(asignacion.router, prefix="/asignaciones", tags=["Asignaciones"])
app.include_router(login_router, prefix="/login", tags=["Autenticación"])
app.include_router(rol_user, prefix="/usuarios", tags=["Usuarios"])  
app.include_router(user_router, prefix="/auth", tags=["Auth"])

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de la Escuela", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "La API está funcionando correctamente"}

























# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Permite todas las orígenes, puedes restringirlo según tus necesidades
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def get_db_connection():
#     conn = psycopg2.connect(Config.DATABASE_URI, cursor_factory=RealDictCursor)
#     return conn

# class Profesor(BaseModel):
#     nombre: str
#     apellido: str
#     email: str

# @app.post("/profesores/")
# def create_profesor(profesor: Profesor):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('INSERT INTO profesores (nombre, apellido, email) VALUES (%s, %s, %s) RETURNING *',
#                 (profesor.nombre, profesor.apellido, profesor.email))
#     new_profesor = cur.fetchone()
#     conn.commit()
#     cur.close()
#     conn.close()
#     return new_profesor

# @app.get("/profesores/")
# def get_profesores():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('SELECT * FROM profesores')
#     profesores = cur.fetchall()
#     cur.close()
#     conn.close()
#     return profesores

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