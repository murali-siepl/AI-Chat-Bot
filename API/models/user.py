from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    firstName: str = Field(..., max_length=25, min_length=2)  # Required, min 2 chars
    lastName: str = Field(..., max_length=25, min_length=2)   # Required, min 2 chars
    
    email: EmailStr = Field(..., unique=True, max_length=50)  # Valid email format
    phone: str = Field(..., max_length=20, min_length=10)  # Min length for valid phone numbers
    
    password: str = Field(..., max_length=25, min_length=8)  # Min 8 chars for security
    
    createdOn: Optional[datetime] = Field(default_factory=datetime.utcnow, sa_column_kwargs={"nullable": True})
