from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base

class Unit(Base):
    __tablename__ = "units"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(20), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    nominal_hours = Column(Integer)
    unit_type = Column(String(20), default="core")
    training_package = Column(String(50))
    release_version = Column(String(10))
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    trainer_specializations = relationship("TrainerSpecialization", back_populates="unit")
    qualification_units = relationship("QualificationUnit", back_populates="unit")



class QualificationUnit(Base):
    __tablename__ = "qualification_units"

    id = Column(Integer, primary_key=True, index=True)
    qualification_id = Column(Integer, ForeignKey("qualifications.id", ondelete="CASCADE"))
    unit_id = Column(Integer, ForeignKey("units.id", ondelete="CASCADE"))
    unit_type = Column(String(20), default="core")
    sequence_order = Column(Integer)
    is_mandatory = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP)

    unit = relationship("Unit", back_populates="qualification_units")
