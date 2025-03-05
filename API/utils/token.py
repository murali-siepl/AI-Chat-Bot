from jose import jwt, JWTError
from config.settings import settings
import datetime
from fastapi import HTTPException
from utils.response import error_response

def create_token(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

def validate_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload["email"]
    except JWTError:
        raise HTTPException(status_code=401, detail=error_response(401, "Invalid token"))