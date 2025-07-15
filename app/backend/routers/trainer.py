from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import crud.trainer as crud
import schemas.trainer as schemas

router = APIRouter(prefix="/trainers", tags=["Trainers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.TrainerOut)
def create_trainer(trainer: schemas.TrainerCreate, db: Session = Depends(get_db)):
    return crud.create_trainer(db, trainer)

@router.get("/{trainer_id}", response_model=schemas.TrainerOut)
def read_trainer(trainer_id: int, db: Session = Depends(get_db)):
    db_trainer = crud.get_trainer(db, trainer_id)
    if db_trainer is None:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return db_trainer

@router.get("/rto/{rto_id}", response_model=list[schemas.TrainerOut])
def get_trainers_by_rto(rto_id: int, db: Session = Depends(get_db)):
    return crud.get_trainers_by_rto(db, rto_id)

@router.put("/{trainer_id}", response_model=schemas.TrainerOut)
def update_trainer(trainer_id: int, trainer: schemas.TrainerUpdate, db: Session = Depends(get_db)):
    updated = crud.update_trainer(db, trainer_id, trainer)
    if updated is None:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return updated

@router.delete("/{trainer_id}")
def delete_trainer(trainer_id: int, db: Session = Depends(get_db)):
    crud.delete_trainer(db, trainer_id)
    return {"message": "Trainer deleted"}

@router.post("/{trainer_id}/specializations", response_model=schemas.TrainerSpecializationOut)
def add_specialization(trainer_id: int, specialization: schemas.TrainerSpecializationCreate, db: Session = Depends(get_db)):
    return crud.create_specialization(db, trainer_id, specialization)

@router.get("/{trainer_id}/specializations", response_model=list[schemas.TrainerSpecializationOut])
def get_specializations(trainer_id: int, db: Session = Depends(get_db)):
    return crud.get_specializations_for_trainer(db, trainer_id)
