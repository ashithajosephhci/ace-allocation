from sqlalchemy.orm import Session
from models.cohort import Cohort
from schemas.cohort import CohortCreate
from sqlalchemy.orm import joinedload


def get_cohorts_by_qualification(db: Session, qualification_id: int):
    return db.query(Cohort)\
        .options(
            joinedload(Cohort.campus),
            joinedload(Cohort.coordinator),
        )\
        .filter(
            Cohort.qualification_id == qualification_id,
            Cohort.status == "active"
        ).all()

def create_cohort(db: Session, cohort: CohortCreate):
    db_cohort = Cohort(**cohort.dict())
    db.add(db_cohort)
    db.commit()
    db.refresh(db_cohort)
    return db_cohort
