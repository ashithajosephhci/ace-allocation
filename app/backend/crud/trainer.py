from sqlalchemy.orm import Session
from models.trainer import Trainer, TrainerSpecialization
from schemas.trainer import TrainerCreate, TrainerUpdate, TrainerSpecializationCreate

def create_trainer(db: Session, trainer: TrainerCreate):
    db_trainer = Trainer(**trainer.dict())
    db.add(db_trainer)
    db.commit()
    db.refresh(db_trainer)
    return db_trainer

def get_trainer(db: Session, trainer_id: int):
    return db.query(Trainer).filter(Trainer.id == trainer_id).first()

def get_trainers_by_rto(db: Session, rto_id: int):
    return db.query(Trainer).filter(Trainer.rto_id == rto_id).all()

def update_trainer(db: Session, trainer_id: int, trainer_update: TrainerUpdate):
    db_trainer = get_trainer(db, trainer_id)
    if not db_trainer:
        return None
    for field, value in trainer_update.dict(exclude_unset=True).items():
        setattr(db_trainer, field, value)
    db.commit()
    db.refresh(db_trainer)
    return db_trainer

def delete_trainer(db: Session, trainer_id: int):
    db_trainer = get_trainer(db, trainer_id)
    if db_trainer:
        db.delete(db_trainer)
        db.commit()

def create_specialization(db: Session, trainer_id: int, specialization: TrainerSpecializationCreate):
    db_spec = TrainerSpecialization(trainer_id=trainer_id, **specialization.dict())
    db.add(db_spec)
    db.commit()
    db.refresh(db_spec)
    return db_spec

def get_specializations_for_trainer(db: Session, trainer_id: int):
    return db.query(TrainerSpecialization).filter(TrainerSpecialization.trainer_id == trainer_id).all()
