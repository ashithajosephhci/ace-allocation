from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, Time, Text, ARRAY, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True)
    rto_id = Column(Integer, ForeignKey("rtos.id", ondelete="CASCADE"))
    qualification_id = Column(Integer, ForeignKey("qualifications.id"))
    unit_id = Column(Integer, ForeignKey("units.id"))
    cohort_id = Column(Integer, ForeignKey("cohorts.id"))
    campus_id = Column(Integer, ForeignKey("campuses.id"))
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    title = Column(String(200), nullable=False)
    description = Column(Text)
    class_type = Column(String(20), default="lecture")
    scheduled_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    duration_minutes = Column(Integer)
    max_students = Column(Integer, default=30)
    enrolled_students = Column(Integer, default=0)
    delivery_mode = Column(String(20), default="face_to_face")
    status = Column(String(20), default="scheduled")
    resources_required = Column(ARRAY(Text))
    assessment_type = Column(String(50))
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    allocations = relationship("ClassAllocation", back_populates="class_", cascade="all, delete")

class ClassAllocation(Base):
    __tablename__ = "class_allocations"

    id = Column(Integer, primary_key=True)
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"))
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    cohort_id = Column(Integer, ForeignKey("cohorts.id"))
    enrollment_date = Column(Date, server_default=func.now())
    attendance_status = Column(String(20), default="enrolled")
    grade = Column(String(10))
    assessment_result = Column(String(20))
    feedback = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    class_ = relationship("Class", back_populates="allocations")
