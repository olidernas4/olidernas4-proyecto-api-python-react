from pydantic import BaseModel, validator


#asignacion

class Asignacion(BaseModel):
    estudiante_id: int
    estudio_id: int
    fecha_inscripcion: str