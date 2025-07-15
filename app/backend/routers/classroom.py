from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas.classroom as schemas
import crud.classroom as crud

router = APIRouter(prefix="/classes", tags=["Classes"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ClassOut)
def create_class(data: schemas.ClassCreate, db: Session = Depends(get_db)):
    return crud.create_class(db, data)

@router.get("/rto/{rto_id}", response_model=list[schemas.ClassOut])
def list_classes_by_rto(rto_id: int, db: Session = Depends(get_db)):
    return crud.get_classes_by_rto(db, rto_id)

@router.put("/{class_id}", response_model=schemas.ClassOut)
def update_class(class_id: int, data: schemas.ClassUpdate, db: Session = Depends(get_db)):
    return crud.update_class(db, class_id, data)

@router.delete("/{class_id}")
def delete_class(class_id: int, db: Session = Depends(get_db)):
    crud.delete_class(db, class_id)
    return {"message": "Class deleted"}

@router.post("/allocations", response_model=schemas.ClassAllocationOut)
def allocate_student(data: schemas.ClassAllocationCreate, db: Session = Depends(get_db)):
    return crud.create_class_allocation(db, data)

@router.get("/{class_id}/allocations", response_model=list[schemas.ClassAllocationOut])
def get_allocations(class_id: int, db: Session = Depends(get_db)):
    return crud.get_class_allocations(db, class_id)
