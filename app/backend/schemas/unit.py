from pydantic import BaseModel
from typing import Optional

class UnitBase(BaseModel):
    code: str
    title: str
    description: Optional[str]
    nominal_hours: Optional[int]
    unit_type: Optional[str]
    training_package: Optional[str]
    release_version: Optional[str]
    is_active: Optional[bool] = True

class UnitOut(UnitBase):
    id: int

    class Config:
        from_attributes  = True

class QualificationUnitOut(BaseModel):
    unit: UnitOut
    unit_type: str
    sequence_order: Optional[int]
    is_mandatory: bool

    class Config:
        from_attributes  = True
