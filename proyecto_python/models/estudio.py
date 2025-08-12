from pydantic import BaseModel, validator
#estudios

class Estudio(BaseModel):
    nombre: str
    descripcion: str
    profesor_id: int