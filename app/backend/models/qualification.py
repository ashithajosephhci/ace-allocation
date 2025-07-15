from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class Qualification(Base):
    __tablename__ = "qualifications"

    id = Column(Integer, primary_key=True, index=True)
    rto_id = Column(Integer, ForeignKey("rtos.id", ondelete="CASCADE"), nullable=False)
    code = Column(String(20), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    level = Column(String(50))
    training_package = Column(String(50))
    duration_weeks = Column(Integer)
    total_hours = Column(Integer)
    core_units = Column(Integer, default=0)
    elective_units = Column(Integer, default=0)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    rto = relationship("RTO", back_populates="qualifications")
    cohorts = relationship("Cohort", back_populates="qualification")
