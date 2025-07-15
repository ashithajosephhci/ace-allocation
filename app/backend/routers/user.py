from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.user import UserCreate, UserOut
from crud import user as crud_user
from auth.auth import get_current_user
from models.user import User
from sqlalchemy.orm import joinedload

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = crud_user.get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db, user)

@router.get("/me", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user_with_rto = db.query(User).options(joinedload(User.rto)).filter(User.id == current_user.id).first()
    return user_with_rto
