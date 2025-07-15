from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.rto import RTOCreate, RTOOut
from crud import rto as crud_rto
from auth.auth import get_current_user
from models.user import User

router = APIRouter(prefix="/rtos", tags=["RTOs"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/stats", tags=["RTOs"], summary="Get statistics for logged-in user's RTO")
def get_rto_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.rto_id:
        raise HTTPException(status_code=400, detail="User is not linked to any RTO")
    
    # total_trainers = db.query(Trainer).filter(Trainer.rto_id == rto_id).count()
    # total_students = db.query(Student).filter(Student.rto_id == rto_id).count()
    # total_classes = db.query(Class).filter(Class.rto_id == rto_id).count()
    # active_courses = db.query(Course).filter(Course.rto_id == rto_id, Course.is_active == True).count()
    return crud_rto.get_rto_stats(db, current_user.rto_id)

@router.post("/", response_model=RTOOut)
def create_rto(rto: RTOCreate, db: Session = Depends(get_db)):
    return crud_rto.create_rto(db, rto)

@router.get("/{rto_id}", response_model=RTOOut)
def get_rto(rto_id: int, db: Session = Depends(get_db)):
    db_rto = crud_rto.get_rto_by_id(db, rto_id)
    if not db_rto:
        raise HTTPException(status_code=404, detail="RTO not found")
    return db_rto

@router.get("/", response_model=list[RTOOut])
def list_rtos(db: Session = Depends(get_db)):
    return crud_rto.get_all_rtos(db)
