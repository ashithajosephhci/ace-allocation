from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime

class TrainerSpecializationBase(BaseModel):
    unit_id: int
    proficiency_level: Optional[str] = "competent"
    years_experience: Optional[int] = 0
    last_taught: Optional[date]

class TrainerSpecializationCreate(TrainerSpecializationBase):
    pass

class TrainerSpecializationOut(TrainerSpecializationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes  = True

class TrainerBase(BaseModel):
    user_id: Optional[int]
    rto_id: int
    employee_id: Optional[str]
    first_name: str
    last_name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    qualifications: Optional[List[str]]
    specializations: Optional[List[str]]
    experience_years: Optional[int] = 0
    contract_type: Optional[str] = "permanent"
    hourly_rate: Optional[float]
    max_hours_per_week: Optional[int] = 40
    is_active: Optional[bool] = True
    hire_date: Optional[date]
    notes: Optional[str]

class TrainerCreate(TrainerBase):
    pass

class TrainerUpdate(TrainerBase):
    pass

class TrainerOut(TrainerBase):
    id: int
    created_at: datetime
    updated_at: datetime
    specializations_rel: List[TrainerSpecializationOut] = []

    class Config:
        from_attributes  = True
