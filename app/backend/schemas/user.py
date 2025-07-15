from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from schemas.rto import RTOOut

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    user_type: str
    rto_id: Optional[int] = None 

class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    user_type: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    rto: Optional[RTOOut] = None
    rto_id: Optional[int] = None

    class Config:
        from_attributes  = True
