from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import APIKey, APIKeyIn
from fastapi.openapi.utils import get_openapi
from routes import auth, chat

app = FastAPI(
    title="Chatbot API",
    description="API for user registration, login, and chat with ChatGPT",
    version="1.0.0"
)

# 🔹 Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow all origins (change to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

# 🔹 Manually define OpenAPI security for token authentication
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    # ✅ Check if components already exist before overriding
    if "components" not in openapi_schema:
        openapi_schema["components"] = {}

    openapi_schema["components"].setdefault("securitySchemes", {})
    openapi_schema["components"]["securitySchemes"]["BearerAuth"] = {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
    }

    for path in openapi_schema["paths"]:
        if "/api/chat" in path:
            for method in openapi_schema["paths"][path]:
                openapi_schema["paths"][path][method]["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# 🔹 Include API Routes
app.include_router(auth.router)  # Register & Login (No Token Required)
app.include_router(chat.router)  # Chat API (Requires Token)
