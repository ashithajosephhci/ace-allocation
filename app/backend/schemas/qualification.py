from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class QualificationCreate(BaseModel):
    rto_id: int
    code: str
    title: str
    level: Optional[str] = None
    training_package: Optional[str] = None
    duration_weeks: Optional[int] = None
    total_hours: Optional[int] = None
    core_units: Optional[int] = 0
    elective_units: Optional[int] = 0
    description: Optional[str] = None
    is_active: Optional[bool] = True

class QualificationOut(QualificationCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
