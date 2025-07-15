from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.auth import get_current_user
from database import SessionLocal
from schemas.campus import CampusBase, CampusCreate, CampusOut
from models.user import User
from crud.campus import get_rto_campuses


router = APIRouter(prefix="/campuses", tags=["Campuses"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/rto", response_model=list[CampusOut])
def get_campuses_for_rto(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print(">> [campuses/rto] current_user.id:", current_user.id)
    print(">> [campuses/rto] current_user.rto_id:", current_user.rto_id)
    if not current_user.rto_id:
        return []
    return get_rto_campuses(db, rto_id=current_user.rto_id)
