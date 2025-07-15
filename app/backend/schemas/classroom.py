from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time, datetime
from schemas.unit import UnitOut

class ClassBase(BaseModel):
    rto_id: int
    qualification_id: int
    unit_id: int
    cohort_id: int
    campus_id: int
    trainer_id: int
    room_id: int
    title: str
    description: Optional[str]
    class_type: Optional[str] = "lecture"
    scheduled_date: date
    start_time: time
    end_time: time
    duration_minutes: Optional[int]
    max_students: Optional[int] = 30
    enrolled_students: Optional[int] = 0
    delivery_mode: Optional[str] = "face_to_face"
    status: Optional[str] = "scheduled"
    resources_required: Optional[List[str]]
    assessment_type: Optional[str]
    notes: Optional[str]

class ClassCreate(ClassBase): pass
class ClassUpdate(ClassBase): pass

class ClassOut(ClassBase):
    id: int
    created_at: datetime
    updated_at: datetime
    unit: Optional[UnitOut]

    class Config:
        from_attributes  = True

class ClassAllocationBase(BaseModel):
    class_id: int
    student_id: int
    cohort_id: int
    enrollment_date: Optional[date]
    attendance_status: Optional[str] = "enrolled"
    grade: Optional[str]
    assessment_result: Optional[str]
    feedback: Optional[str]

class ClassAllocationCreate(ClassAllocationBase): pass

class ClassAllocationOut(ClassAllocationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
