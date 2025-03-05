from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from models.user import User
from passlib.context import CryptContext
from database import engine
from routes.chat import get_current_user
from utils.token import create_token
from utils.response import success_response, error_response
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class RegisterRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    password: str

    class Config:
        schema_extra = {
            "json_schema_extra": {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john@example.com",
                "phone": "1234567890",
                "password": "password123"
            }
        }

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

async def get_session():
    async with AsyncSession(engine) as session:
        yield session

@router.post("/register", summary="Register a new user")
async def register(request: RegisterRequest, session: AsyncSession = Depends(get_session)):
    email_lower = request.email.lower()
    print("Checking email:", email_lower)  # Debugging
    
    statement = select(User).where(User.email == email_lower)
    result = await session.exec(statement)
    existing_user = result.one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail=error_response(400, "Email already exists"))

    user = User(
        firstName=request.firstName,
        lastName=request.lastName,
        email=email_lower,  # Store email in lowercase
        phone=request.phone,
        password=pwd_context.hash(request.password)
    )

    session.add(user)
    await session.commit()
    await session.refresh(user)

    return success_response(message="User registered successfully", status_code=201)

class LoginRequest(BaseModel):
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@example.com",
                "password": "password123"
            }
        }

@router.post("/login", summary="Login and get JWT token")
async def login(request: LoginRequest, session: AsyncSession = Depends(get_session)):
    email_lower = request.email.lower()
    statement = select(User).where(User.email == email_lower)
    result = await session.exec(statement)
    user = result.one_or_none()
    
    if not user or not pwd_context.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail=error_response(401, "Invalid credentials"))
    
    token = create_token(user.email)
    return success_response({"email": user.email, "token": token}, "Login successful")
