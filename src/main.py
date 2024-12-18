from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .users_controller import router as user_router
from .database import get_engine

def create_app():
    # Inicializa a aplicação FastAPI
    app = FastAPI()

    # Configuração de CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Rotas
    app.include_router(user_router, tags=["Users"])

    # Inicializar o banco de dados (evite problemas fora do contexto)
    @app.on_event("startup")
    async def startup_event():
        get_engine()

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    import os
    # Porta dinâmica para serviços como Render
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("src.main:app", host="0.0.0.0", port=port, reload=True)
