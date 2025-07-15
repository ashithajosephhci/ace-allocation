from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text, TIMESTAMP, func
from sqlalchemy.orm import relationship
from database import Base

class Cohort(Base):
    __tablename__ = "cohorts"

    id = Column(Integer, primary_key=True, index=True)
    rto_id = Column(Integer, ForeignKey("rtos.id", ondelete="CASCADE"))
    qualification_id = Column(Integer, ForeignKey("qualifications.id", ondelete="CASCADE"))
    campus_id = Column(Integer, ForeignKey("campuses.id", ondelete="CASCADE"))
    code = Column(String(20), unique=True, nullable=False)
    name = Column(String(100))
    intake_date = Column(Date)
    expected_completion_date = Column(Date)
    max_students = Column(Integer, default=30)
    current_students = Column(Integer, default=0)
    delivery_mode = Column(String(20), default="face_to_face")
    status = Column(String(20), default="active")
    coordinator_id = Column(Integer, ForeignKey("users.id"))
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    qualification = relationship("Qualification", back_populates="cohorts")
    campus = relationship("Campus", back_populates="cohorts")
    coordinator = relationship("User", back_populates="coordinated_cohorts", lazy="selectin")
    rto = relationship("RTO", back_populates="cohorts")
