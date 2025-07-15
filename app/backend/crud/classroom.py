from sqlalchemy.orm import Session
from models.classroom import Class, ClassAllocation
from schemas.classroom import ClassCreate, ClassUpdate, ClassAllocationCreate

def create_class(db: Session, data: ClassCreate):
    obj = Class(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_classes_by_rto(db: Session, rto_id: int):
    return db.query(Class).filter(Class.rto_id == rto_id).all()

def update_class(db: Session, class_id: int, data: ClassUpdate):
    obj = db.query(Class).filter(Class.id == class_id).first()
    if obj:
        for field, value in data.dict(exclude_unset=True).items():
            setattr(obj, field, value)
        db.commit()
        db.refresh(obj)
    return obj

def delete_class(db: Session, class_id: int):
    obj = db.query(Class).filter(Class.id == class_id).first()
    if obj:
        db.delete(obj)
        db.commit()

def create_class_allocation(db: Session, data: ClassAllocationCreate):
    obj = ClassAllocation(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_class_allocations(db: Session, class_id: int):
    return db.query(ClassAllocation).filter(ClassAllocation.class_id == class_id).all()
