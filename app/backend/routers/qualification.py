from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from auth.auth import get_current_user
from models.user import User
from crud import qualification as crud_qualification
from schemas.qualification import QualificationCreate, QualificationOut

router = APIRouter(prefix="/qualifications", tags=["Qualifications"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=QualificationOut)
def create_qualification(q: QualificationCreate, db: Session = Depends(get_db)):
    return crud_qualification.create_qualification(db, q)

@router.get("/rto", response_model=list[QualificationOut])
def list_qualifications_by_rto(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.rto_id:
        raise HTTPException(status_code=400, detail="User not linked to RTO")
    return crud_qualification.get_qualifications_by_rto(db, current_user.rto_id)
