from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """
    Configuracion de la aplicacion usando variables de entorno
    """
    # App Settings
    APP_NAME: str = "Hiring Copilot AI Service"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # API Settings
    API_V1_PREFIX: str = "/api/v1"

    # CORS Settings
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",  # Frontend local
        "http://localhost:5173",  # Vite dev server
        "http://localhost:5174",  # Vite preview
    ]

    # AI Settings
    GEMINI_API_KEY: Optional[str] = None

    # Backend Integration
    BACKEND_API_URL: Optional[str] = "http://localhost:5000"  # URL del backend .NET

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow"
    )


# Instancia global de configuracion
settings = Settings()
