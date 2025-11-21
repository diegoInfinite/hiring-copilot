from fastapi import APIRouter, status
from datetime import datetime
import platform
import sys
from typing import Dict, Any

from app.core.config import settings

router = APIRouter()


@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, Any]:
    """
    Health check basico - retorna OK si el servicio esta corriendo

    Este endpoint es util para:
    - Load balancers
    - Kubernetes liveness probes
    - Monitoreo simple de disponibilidad
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@router.get("/health/detailed", status_code=status.HTTP_200_OK)
async def detailed_health_check() -> Dict[str, Any]:
    """
    Health check detallado con informacion del sistema

    Incluye:
    - Informacion del servicio
    - Detalles del sistema operativo
    - Version de Python
    - Configuracion activa
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": {
            "name": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "debug_mode": settings.DEBUG
        },
        "system": {
            "platform": platform.system(),
            "platform_release": platform.release(),
            "platform_version": platform.version(),
            "architecture": platform.machine(),
            "hostname": platform.node(),
            "python_version": sys.version.split()[0]
        },
        "configuration": {
            "api_prefix": settings.API_V1_PREFIX,
            "host": settings.HOST,
            "port": settings.PORT,
            "backend_url": settings.BACKEND_API_URL,
            "gemini_configured": settings.GEMINI_API_KEY is not None
        }
    }


@router.get("/health/ready", status_code=status.HTTP_200_OK)
async def readiness_check() -> Dict[str, Any]:
    """
    Readiness check - verifica que el servicio esta listo para recibir trafico

    Verifica:
    - API Key de Gemini configurada (opcional por ahora)
    - Backend accesible (futuro: hacer ping al backend)

    Este endpoint es util para:
    - Kubernetes readiness probes
    - Verificar que las dependencias estan disponibles
    """
    checks = {
        "api_running": True,
        "gemini_api_configured": settings.GEMINI_API_KEY is not None,
        "backend_configured": settings.BACKEND_API_URL is not None
    }
    all_ready = checks["api_running"]

    return {
        "status": "ready" if all_ready else "not_ready",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": checks,
        "message": "Service is ready to accept traffic" if all_ready else "Service has issues"
    }


@router.get("/health/ping", status_code=status.HTTP_200_OK)
async def ping() -> Dict[str, str]:
    """
    Ping simple - respuesta minima para verificar conectividad
    """
    return {"ping": "pong"}
