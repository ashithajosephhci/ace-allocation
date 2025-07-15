from sqlalchemy.orm import Session
from models.qualification import Qualification
from schemas.qualification import QualificationCreate

def create_qualification(db: Session, q: QualificationCreate):
    db_q = Qualification(**q.dict())
    db.add(db_q)
    db.commit()
    db.refresh(db_q)
    return db_q

def get_qualifications_by_rto(db: Session, rto_id: int):
    return db.query(Qualification).filter(Qualification.rto_id == rto_id, Qualification.is_active == True).all()
