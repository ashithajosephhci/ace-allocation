from sqlalchemy.orm import Session
from models.campus import Campus
from schemas.campus import CampusCreate

def get_rto_campuses(db: Session, rto_id: int):
    if rto_id is None:
        return []
    return db.query(Campus).filter(Campus.rto_id == rto_id, Campus.is_active == True).all()

def create_campus(db: Session, campus: CampusCreate):
    db_campus = Campus(**campus.dict())
    db.add(db_campus)
    db.commit()
    db.refresh(db_campus)
    return db_campus
