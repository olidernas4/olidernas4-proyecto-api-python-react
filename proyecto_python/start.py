#!/usr/bin/env python3
"""
Script para iniciar la aplicación FastAPI
"""
import uvicorn

if __name__ == "__main__":
    print("🚀 Iniciando el servidor de la API...")
    print("📍 URL: http://localhost:8000")
    print("📖 Documentación: http://localhost:8000/docs")
    print("🔧 Redoc: http://localhost:8000/redoc")
    print("=" * 50)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Recarga automática cuando cambies archivos
        log_level="info"
    )
