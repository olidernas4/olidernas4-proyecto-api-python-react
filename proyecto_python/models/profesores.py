from pydantic import BaseModel, validator
# Modelo para el Profesor
class Profesor(BaseModel):
    nombre: str
    apellido: str
    email: str

    # Validador para el campo email
    @validator('email')
    def validar_email(cls, v):
        # Verificar si el email contiene "@" y un dominio
        if "@" not in v or "." not in v:
            raise ValueError('El correo debe ser válido')
        return v