from pydantic import BaseModel
from typing import Optional
from datetime import date

class CohortBase(BaseModel):
    code: str
    name: Optional[str]
    intake_date: Optional[date]
    expected_completion_date: Optional[date]
    max_students: Optional[int] = 30
    current_students: Optional[int] = 0
    delivery_mode: Optional[str] = "face_to_face"
    status: Optional[str] = "active"
    notes: Optional[str]

class CohortCreate(CohortBase):
    rto_id: int
    qualification_id: int
    campus_id: int
    coordinator_id: Optional[int]

class CohortOut(CohortBase):
    id: int
    rto_id: int
    qualification_id: int
    campus_id: int
    coordinator_id: Optional[int]

    class Config:
        from_attributes  = True
