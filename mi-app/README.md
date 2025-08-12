# 🏫 Sistema de Gestión Escolar

Un sistema completo de gestión escolar desarrollado con React y Python FastAPI, con interfaz moderna y funcionalidades avanzadas.

## ✨ Características Principales

### 🎯 Funcionalidades Implementadas

- **🔐 Autenticación Segura**: Sistema de login con JWT tokens
- **📊 Dashboard Interactivo**: Panel principal con estadísticas y navegación
- **👥 Gestión de Estudiantes**: CRUD completo con paginación y búsqueda
- **👨‍🏫 Gestión de Profesores**: CRUD completo con paginación y búsqueda
- **👤 Perfil de Usuario**: Edición de información personal
- **📱 Diseño Responsive**: Optimizado para móviles y tablets
- **🎨 UI/UX Moderna**: Interfaz intuitiva con animaciones y transiciones

### 🛠️ Tecnologías Utilizadas

**Frontend:**
- React 18.3.1
- React Router DOM 7.8.0
- CSS3 con diseño moderno
- Axios para peticiones HTTP

**Backend:**
- Python FastAPI
- JWT para autenticación
- Base de datos (configurada según tu backend)

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend Python FastAPI ejecutándose en `http://localhost:8000`

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <tu-repositorio>
cd mi-app
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Login.jsx       # Página de inicio de sesión
│   ├── Register.jsx    # Página de registro
│   ├── Dashboard.jsx   # Panel principal
│   ├── Profile.jsx     # Perfil de usuario
│   ├── EstudiantesManager.jsx  # Gestión de estudiantes
│   └── ProfesoresManager.jsx   # Gestión de profesores
├── styles/             # Archivos CSS
│   ├── Login.css
│   ├── Register.css
│   ├── Dashboard.css
│   ├── Profile.css
│   ├── EstudiantesManager.css
│   └── ProfesoresManager.css
├── App.js              # Componente principal con routing
├── App.css             # Estilos globales
└── index.js            # Punto de entrada
```

## 🎨 Características de la UI

### 🎯 Dashboard
- **Sidebar de navegación** con enlaces a todas las secciones
- **Tarjetas de estadísticas** con información en tiempo real
- **Acciones rápidas** para acceso directo a funciones principales
- **Actividad reciente** para seguimiento de acciones

### 📊 Gestión de Estudiantes
- **Búsqueda en tiempo real** por nombre, apellido o correo
- **Paginación** para manejar grandes volúmenes de datos
- **Formulario de creación** con validación
- **Tarjetas visuales** para cada estudiante
- **Acciones de edición y eliminación**

### 👨‍🏫 Gestión de Profesores
- **Búsqueda avanzada** por múltiples criterios
- **Paginación** con navegación intuitiva
- **Formulario completo** con campos adicionales
- **Información detallada** de especialidad y experiencia
- **Gestión completa** de profesores

### 👤 Perfil de Usuario
- **Edición en línea** de información personal
- **Sección de seguridad** con opciones avanzadas
- **Historial de actividad** del usuario
- **Interfaz intuitiva** para gestión de datos

## 🔧 Configuración del Backend

Asegúrate de que tu backend Python FastAPI esté configurado con:

### Endpoints Requeridos

**Autenticación:**
- `POST /auth/login` - Inicio de sesión
- `POST /auth/register` - Registro de usuarios

**Estudiantes:**
- `GET /estudiantes/estudiante_view` - Listar estudiantes
- `POST /estudiantes/create/` - Crear estudiante
- `DELETE /estudiantes/delete/{id}` - Eliminar estudiante

**Profesores:**
- `GET /profesores/` - Listar profesores
- `POST /profesores/` - Crear profesor
- `DELETE /profesores/{id}` - Eliminar profesor

## 🎨 Personalización

### Colores del Tema
El sistema utiliza una paleta de colores moderna:
- **Primario**: `#667eea` (Azul)
- **Secundario**: `#17a2b8` (Cian)
- **Éxito**: `#28a745` (Verde)
- **Peligro**: `#dc3545` (Rojo)
- **Advertencia**: `#ffc107` (Amarillo)

### Responsive Design
- **Desktop**: Layout completo con sidebar
- **Tablet**: Adaptación automática de grids
- **Mobile**: Navegación optimizada para touch

## 🔒 Seguridad

- **Autenticación JWT** con tokens seguros
- **Protección de rutas** para usuarios no autenticados
- **Validación de formularios** en frontend y backend
- **Manejo seguro de errores** con mensajes informativos

## 📱 Funcionalidades Avanzadas

### 🔍 Búsqueda Inteligente
- Búsqueda en tiempo real
- Filtrado por múltiples criterios
- Resultados instantáneos

### 📄 Paginación
- Navegación por páginas
- Configuración de elementos por página
- Indicadores visuales de página actual

### 🎯 Navegación
- Breadcrumbs automáticos
- Navegación con historial
- Enlaces de retorno intuitivos

## 🚀 Despliegue

### Producción
```bash
npm run build
```

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=production
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [GitHub Issues]
- 📖 Documentación: [Wiki del proyecto]

---

**¡Disfruta usando el Sistema de Gestión Escolar! 🎓**
