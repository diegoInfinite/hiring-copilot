# Hiring Copilot - AI Service

Servicio de IA para evaluación de candidatos, generación de preguntas de entrevista y tareas técnicas.

## 🚀 Inicio Rápido

### 1. Instalación de Dependencias

```bash
# Crear entorno virtual (recomendado)
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 2. Configuración

```bash
# Copiar archivo de ejemplo
copy .env.example .env

# Editar .env con tus valores (opcional para health checks)
# GEMINI_API_KEY=tu-api-key-aqui
# BACKEND_API_URL=http://localhost:5000
```

### 3. Ejecutar la API

**Modo Desarrollo (con hot-reload):**
```bash
python run.py --dev
```

**Modo Producción:**
```bash
python run.py
```

**Puerto personalizado:**
```bash
python run.py --dev --port 8080
```

### 4. Verificar que funciona

La API estará disponible en: `http://localhost:8000`

**Endpoints de prueba:**
- Root: http://localhost:8000/
- Health Check: http://localhost:8000/api/v1/health
- Health Detallado: http://localhost:8000/api/v1/health/detailed
- Readiness: http://localhost:8000/api/v1/health/ready
- Ping: http://localhost:8000/api/v1/health/ping

**Documentación interactiva:**
- Swagger UI: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## 📝 Probar los Endpoints

### Opción 1: Navegador
Simplemente abre cualquiera de las URLs en tu navegador.

### Opción 2: cURL (desde terminal)
```bash
# Health check básico
curl http://localhost:8000/api/v1/health

# Health check detallado
curl http://localhost:8000/api/v1/health/detailed

# Readiness check
curl http://localhost:8000/api/v1/health/ready

# Ping
curl http://localhost:8000/api/v1/health/ping
```

### Opción 3: PowerShell (Windows)
```powershell
# Health check básico
Invoke-WebRequest -Uri http://localhost:8000/api/v1/health | Select-Object -Expand Content

# O de forma más legible:
(Invoke-RestMethod -Uri http://localhost:8000/api/v1/health) | ConvertTo-Json
```

### Opción 4: Python
```python
import requests

response = requests.get("http://localhost:8000/api/v1/health")
print(response.json())
```

## 🧪 Entender las Respuestas

### GET /api/v1/health
```json
{
  "status": "healthy",
  "timestamp": "2025-01-18T10:30:00.123456",
  "service": "Hiring Copilot AI Service",
  "version": "0.1.0"
}
```

### GET /api/v1/health/detailed
```json
{
  "status": "healthy",
  "timestamp": "2025-01-18T10:30:00.123456",
  "service": {
    "name": "Hiring Copilot AI Service",
    "version": "0.1.0",
    "debug_mode": true
  },
  "system": {
    "platform": "Windows",
    "python_version": "3.11.0"
  },
  "configuration": {
    "api_prefix": "/api/v1",
    "gemini_configured": false,
    "backend_url": "http://localhost:5000"
  }
}
```

## 🌐 Comunicación con el Mundo Externo

### 1. **Frontend → AI Service**
El frontend puede consumir esta API usando `fetch` o `axios`:

```javascript
// Ejemplo con fetch
const response = await fetch('http://localhost:8000/api/v1/health');
const data = await response.json();
console.log(data);
```

### 2. **Backend .NET → AI Service**
El backend .NET puede llamar a esta API usando `HttpClient`:

```csharp
using var client = new HttpClient();
var response = await client.GetAsync("http://localhost:8000/api/v1/health");
var content = await response.Content.ReadAsStringAsync();
```

### 3. **AI Service → Backend .NET**
Este servicio puede enviar resultados al backend:

```python
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        "http://localhost:5000/api/candidates/analysis",
        json={"candidate_id": "123", "score": 85}
    )
```

### 4. **AI Service → Google Gemini**
Para usar la API de Gemini (próximos pasos):

```python
import google.generativeai as genai

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Analiza este CV...")
```

## 📁 Estructura del Proyecto

```
hiring-copilot-data/
├── app/
│   ├── __init__.py
│   ├── main.py                 # ✅ Aplicación FastAPI principal
│   ├── api/
│   │   └── v1/
│   │       └── routes_health.py  # ✅ Rutas de health check
│   └── core/
│       └── config.py           # ✅ Configuración centralizada
├── .env.example                # ✅ Ejemplo de variables de entorno
├── .gitignore                  # ✅ Archivos a ignorar
├── requirements.txt            # ✅ Dependencias Python
├── run.py                      # ✅ Script de inicio
└── README.md                   # ✅ Este archivo
```

## 🔧 Próximos Pasos

Ahora que tienes la API base funcionando, puedes:

1. **Agregar más endpoints** (evaluation, questions, assessments)
2. **Integrar Gemini API** para análisis de CVs
3. **Implementar servicios** (extractors, matching, scoring)
4. **Conectar con el backend .NET** para persistir datos
5. **Agregar manejo de archivos** (upload de PDFs/DOCX)

## 🐛 Troubleshooting

**Error: ModuleNotFoundError: No module named 'fastapi'**
- Asegúrate de haber instalado las dependencias: `pip install -r requirements.txt`
- Verifica que estés en el entorno virtual activado

**Error: Port 8000 already in use**
- Usa otro puerto: `python run.py --dev --port 8080`
- O detén el proceso que está usando el puerto 8000

**La API no responde**
- Verifica que el servidor esté corriendo (deberías ver logs en la terminal)
- Asegúrate de estar accediendo a la URL correcta: `http://localhost:8000`

## 📚 Recursos

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
