from sqlalchemy.orm import Session
from models.rto import RTO
from schemas.rto import RTOCreate

def create_rto(db: Session, rto: RTOCreate):
    db_rto = RTO(**rto.dict())
    db.add(db_rto)
    db.commit()
    db.refresh(db_rto)
    return db_rto

def get_rto_by_id(db: Session, rto_id: int):
    return db.query(RTO).filter(RTO.id == rto_id).first()

def get_all_rtos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(RTO).offset(skip).limit(limit).all()

def get_rto_stats(db: Session, rto_id: int):
    # Example placeholders — replace these with actual models and filters
    # total_trainers = db.query(Trainer).filter(Trainer.rto_id == rto_id).count()
    # total_students = db.query(Student).filter(Student.rto_id == rto_id).count()
    # total_classes = db.query(Class).filter(Class.rto_id == rto_id).count()
    # active_courses = db.query(Course).filter(Course.rto_id == rto_id, Course.is_active == True).count()

    return {
        "total_trainers": 10,
        "total_students": 20,
        "total_classes": 12,
        "active_courses": 22
    }

    # return {
    #     "total_trainers": total_trainers,
    #     "total_students": total_students,
    #     "total_classes": total_classes,
    #     "active_courses": active_courses,
    # }
