from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time, datetime

class RoomBase(BaseModel):
    campus_id: int
    name: str
    code: Optional[str]
    room_type: Optional[str] = "classroom"
    capacity: Optional[int] = 20
    equipment: Optional[List[str]]
    features: Optional[List[str]]
    accessibility_features: Optional[List[str]]
    is_bookable: Optional[bool] = True
    is_active: Optional[bool] = True
    notes: Optional[str]

class RoomCreate(RoomBase):
    pass

class RoomUpdate(RoomBase):
    pass

class RoomOut(RoomBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True

class RoomBookingBase(BaseModel):
    room_id: int
    class_id: int
    booking_date: date
    start_time: time
    end_time: time
    booking_type: Optional[str] = "class"
    booked_by: Optional[int]
    status: Optional[str] = "confirmed"
    notes: Optional[str]

class RoomBookingCreate(RoomBookingBase):
    pass

class RoomBookingOut(RoomBookingBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes  = True
