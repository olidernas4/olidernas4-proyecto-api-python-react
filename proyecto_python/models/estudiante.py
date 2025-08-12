from pydantic import BaseModel, validator

class Estudiante(BaseModel):
    nombre: str
    apellido: str
    correo: str
    edad: int
    direccion: str

    @validator('correo')
    def validar_correo(cls, v):
        if "@" not in v or "." not in v:
            raise ValueError('El correo debe ser válido')
        return v
    