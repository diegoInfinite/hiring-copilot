"""
Script de inicio para el servicio AI de Hiring Copilot

Uso:
    python run.py                    # Modo producción
    python run.py --dev              # Modo desarrollo con hot-reload
    python run.py --port 8080        # Puerto personalizado
"""

import argparse
import uvicorn


def main():
    parser = argparse.ArgumentParser(description="Hiring Copilot AI Service")
    parser.add_argument(
        "--dev",
        action="store_true",
        help="Ejecutar en modo desarrollo con hot-reload"
    )
    parser.add_argument(
        "--host",
        type=str,
        default="0.0.0.0",
        help="Host donde escuchar (default: 0.0.0.0)"
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Puerto donde escuchar (default: 8000)"
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=1,
        help="Número de workers (solo producción, default: 1)"
    )

    args = parser.parse_args()

    config = {
        "app": "app.main:app",
        "host": args.host,
        "port": args.port,
    }

    if args.dev:
        print("[DEV] Iniciando en modo DESARROLLO con hot-reload")
        config["reload"] = True
        config["log_level"] = "debug"
    else:
        print("[PROD] Iniciando en modo PRODUCCION")
        config["workers"] = args.workers
        config["log_level"] = "info"

    print(f"[INFO] Servidor escuchando en http://{args.host}:{args.port}")
    print(f"[DOCS] Documentacion disponible en http://{args.host}:{args.port}/api/v1/docs")

    uvicorn.run(**config)


if __name__ == "__main__":
    main()
