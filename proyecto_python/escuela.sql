-- Database: escuela

-- DROP DATABASE IF EXISTS escuela;


select * from profesores

CREATE DATABASE escuela
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
		-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL  -- 'Estudiante' o 'Profesor'
);

-- Tabla de usuarios (para login)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, -- contraseña encriptada
    rol_id INT NOT NULL, -- Rol del usuario (Profesor o Estudiante)
    CONSTRAINT fk_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles (id)
);

-- Tabla de profesores
CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    usuario_id INT, -- Relación con usuarios
    CONSTRAINT fk_usuario_profesor
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
);

-- Tabla de estudiantes
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    edad INT,
    direccion VARCHAR(255),
    usuario_id INT, -- Relación con usuarios
    CONSTRAINT fk_usuario_estudiante
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
);

-- Tabla de materias
CREATE TABLE estudios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,  -- nombre de la materia
    descripcion TEXT,              -- descripción de la materia
    profesor_id INT,
    CONSTRAINT fk_profesor
        FOREIGN KEY (profesor_id) 
        REFERENCES profesores (id)
        ON DELETE SET NULL
);

-- Tabla de asignación de materias (muchos a muchos entre estudiantes y materias)
CREATE TABLE asignacion (
    id SERIAL PRIMARY KEY,
    estudiante_id INT,
    estudio_id INT,
    fecha_inscripcion DATE,
    CONSTRAINT fk_estudiante
        FOREIGN KEY (estudiante_id) 
        REFERENCES estudiantes (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_estudio
        FOREIGN KEY (estudio_id) 
        REFERENCES estudios (id)
        ON DELETE CASCADE
);

-- Insertar roles
INSERT INTO roles (nombre)
VALUES 
('Profesor'),
('Estudiante');

-- Insertar usuarios (ejemplo)
-- En la práctica, las contraseñas deben ser encriptadas (ej. bcrypt)
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id)
VALUES 
('Juan', 'Pérez', 'juan.perez@escuela.com', 'hashed_password', 1),  -- Profesor
('Pedro', 'Ramírez', 'pedro.ramirez@escuela.com', 'hashed_password', 2); -- Estudiante

-- Insertar relación de usuario con profesor
UPDATE profesores 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'juan.perez@escuela.com')
WHERE correo = 'juan.perez@escuela.com';

-- Insertar relación de usuario con estudiante
UPDATE estudiantes 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'pedro.ramirez@escuela.com')
WHERE correo = 'pedro.ramirez@escuela.com';



-- Insertar datos en la tabla de profesores
INSERT INTO profesores (nombre, apellido, correo, especialidad)
VALUES 
('Juan', 'Pérez', 'juan.perez@escuela.com', 'Matemáticas');

-- Insertar datos en la tabla de estudiantes
INSERT INTO estudiantes (nombre, apellido, correo, edad, direccion)
VALUES 
('Pedro', 'Ramírez', 'pedro.ramirez@escuela.com', 20, 'Calle Falsa 123');

-- Actualizar relación de usuario con profesor
UPDATE profesores 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'juan.perez@escuela.com')
WHERE correo = 'juan.perez@escuela.com';

-- Actualizar relación de usuario con estudiante
UPDATE estudiantes 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'pedro.ramirez@escuela.com')
WHERE correo = 'pedro.ramirez@escuela.com';




INSERT INTO roles (nombre)
VALUES 
('admin')


-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id)
VALUES 
('Juan', 'Pérez', 'juan.perez@escuela.com', 'hashed_password', 1),  -- Profesor
('Pedro', 'Ramírez', 'pedro.ramirez@escuela.com', 'hashed_password', 2); -- Estudiante

-- Insertar datos en la tabla de profesores
INSERT INTO profesores (nombre, apellido, correo, especialidad)
VALUES 
('Juan', 'Pérez', 'juan.perez@escuela.com', 'Matemáticas');

-- Insertar datos en la tabla de estudiantes
INSERT INTO estudiantes (nombre, apellido, correo, edad, direccion)
VALUES 
('Pedro', 'Ramírez', 'pedro.ramirez@escuela.com', 20, 'Calle Falsa 123');

-- Actualizar relación de usuario con profesor
UPDATE profesores 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'juan.perez@escuela.com')
WHERE correo = 'juan.perez@escuela.com';

-- Actualizar relación de usuario con estudiante
UPDATE estudiantes 
SET usuario_id = (SELECT id FROM usuarios WHERE correo = 'pedro.ramirez@escuela.com')
WHERE correo = 'pedro.ramirez@escuela.com';


-- Insertar un nuevo rol para Administrador si no existe
INSERT INTO roles (nombre) 
VALUES ('Administrador')
ON CONFLICT (nombre) DO NOTHING;  -- Esto evitará duplicados

-- Insertar el usuario administrador con la contraseña hasheada
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id)
VALUES 
('Admin', 'User', 'admin@escuela.com', '$2b$12$Xz6e5eK23NF93f2hnnyuf.U94x2TOlCaviiixE3H5VSicvCGiDwUq', (SELECT id FROM roles WHERE nombre = 'Administrador'));

INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id)
VALUES 
('andres', 'User', 'andres@escuela.com', '1', (SELECT id FROM roles WHERE nombre = 'Administrador'));
