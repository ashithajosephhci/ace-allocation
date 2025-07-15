from sqlalchemy.orm import Session
from models.unit import QualificationUnit
from schemas.unit import QualificationUnitOut

def get_units_by_qualification(db: Session, qualification_id: int):
    return (
        db.query(Unit)
        .join(QualificationUnit, QualificationUnit.unit_id == Unit.id)
        .filter(QualificationUnit.qualification_id == qualification_id)
        .all()
    )
