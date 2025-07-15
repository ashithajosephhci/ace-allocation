from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, Text, ARRAY, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql import func
from models.unit import Unit  # ✅ Ensure Unit is imported


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    rto_id = Column(Integer, ForeignKey("rtos.id", ondelete="CASCADE"))
    employee_id = Column(String(20))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    qualifications = Column(ARRAY(Text))
    specializations = Column(ARRAY(Text))  # Consider removing if using trainer_specializations only
    experience_years = Column(Integer, default=0)
    contract_type = Column(String(20), default="permanent")
    hourly_rate = Column(DECIMAL(8, 2))
    max_hours_per_week = Column(Integer, default=40)
    is_active = Column(Boolean, default=True)
    hire_date = Column(Date)
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    trainer_specializations = relationship("TrainerSpecialization", back_populates="trainer", cascade="all, delete-orphan")
    rto = relationship("RTO", back_populates="trainers")  

class TrainerSpecialization(Base):
    __tablename__ = "trainer_specializations"

    id = Column(Integer, primary_key=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id", ondelete="CASCADE"))
    unit_id = Column(Integer, ForeignKey("units.id", ondelete="CASCADE"))
    proficiency_level = Column(String(20), default="competent")
    years_experience = Column(Integer, default=0)
    last_taught = Column(Date)
    created_at = Column(TIMESTAMP, server_default=func.now())

    trainer = relationship("Trainer", back_populates="trainer_specializations")  # ✅ this expects the reverse!
    unit = relationship("Unit", back_populates="trainer_specializations")   
