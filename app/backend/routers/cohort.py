from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.auth import get_current_user
from database import SessionLocal
from schemas.cohort import CohortOut
from models.user import User
from crud.cohort import get_cohorts_by_qualification

router = APIRouter(prefix="/cohorts", tags=["Cohorts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/by_qualification/{qualification_id}", response_model=list[CohortOut])
def get_cohorts_for_qualification(
    qualification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_cohorts_by_qualification(db, qualification_id)
