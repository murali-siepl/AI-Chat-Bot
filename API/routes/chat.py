import os
import asyncio
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from openai import AsyncOpenAI
from utils.response import success_response
from utils.token import validate_token  

# ✅ Load API keys from .env file
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("❌ OPENAI_API_KEY is missing! Set it in your .env file.")

# ✅ Initialize OpenAI client (ASYNC version)
client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# ✅ FastAPI setup
app = FastAPI(title="ChatGPT Streaming API", version="1.0")
router = APIRouter(prefix="/api/chat", tags=["Chat"])
security = HTTPBearer()

# ✅ Token Validation
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user_email = validate_token(token)  
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user_email

# ✅ Streaming Generator
async def generate_chat_stream(prompt: str):
    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            stream=True  
        )

        async for chunk in response:
            content = chunk.choices[0].delta.content if chunk.choices and chunk.choices[0].delta.content else ""
            if content:
                yield content
            await asyncio.sleep(0.02)  # ✅ Reduce delay for faster streaming

    except Exception as e:
        yield f"Error: {str(e)}"

# ✅ Chat Endpoint with Streaming
@router.post("/stream")
async def chat_response(request: dict, user_email: str = Depends(get_current_user)):
    prompt = request.get("prompt", "").strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    return StreamingResponse(generate_chat_stream(prompt), media_type="text/plain")

# ✅ Logout Endpoint
@router.post("/logout", summary="Logout and invalidate JWT token", dependencies=[Depends(security)])
async def logout(user_email: str = Depends(get_current_user)):
    return success_response(message="Logged out successfully")
# ✅ Include router
app.include_router(router)
