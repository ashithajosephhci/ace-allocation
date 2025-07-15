from typing import Optional, List
from pydantic import BaseModel

class CampusBase(BaseModel):
    name: str
    code: str
    address_line1: str
    address_line2: Optional[str]
    city: str
    state: str
    postcode: str
    country: Optional[str] = "Australia"
    phone: Optional[str]
    email: Optional[str]
    facilities: Optional[List[str]]
    capacity: Optional[int]
    is_active: Optional[bool] = True

class CampusCreate(CampusBase):
    rto_id: int

class CampusOut(CampusBase):
    id: int
    rto_id: int

    class Config:
        from_attributes = True
