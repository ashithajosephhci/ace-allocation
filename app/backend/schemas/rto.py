from pydantic import BaseModel, EmailStr, HttpUrl
from typing import Optional
from datetime import date, datetime

class RTOCreate(BaseModel):
    name: str
    code: str
    abn: Optional[str] = None
    website: Optional[HttpUrl] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postcode: Optional[str] = None
    country: Optional[str] = "Australia"
    logo_url: Optional[HttpUrl] = None
    description: Optional[str] = None
    established_date: Optional[date] = None
    registration_status: Optional[str] = "Active"
    asqa_registration: Optional[str] = None

class RTOOut(RTOCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
