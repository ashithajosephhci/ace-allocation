from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.auth import get_current_user
from models.user import User
from database import SessionLocal
from crud import unit as crud_unit
from schemas.unit import UnitOut
from typing import List

router = APIRouter(prefix="/units", tags=["Units"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/by_qualification/{qualification_id}", response_model=List[UnitOut])
def get_units_by_qualification(
    qualification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return crud_unit.get_units_by_qualification(db, qualification_id)