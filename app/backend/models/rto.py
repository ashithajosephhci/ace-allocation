from sqlalchemy import Column, String, Integer, Text, Date, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship


class RTO(Base):
    __tablename__ = "rtos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    abn = Column(String(20))
    website = Column(String(255))
    phone = Column(String(50))
    email = Column(String(255))
    address_line1 = Column(String(255))
    address_line2 = Column(String(255))
    city = Column(String(100))
    state = Column(String(50))
    postcode = Column(String(10))
    country = Column(String(100), default="Australia")
    logo_url = Column(String(500))
    description = Column(Text)
    established_date = Column(Date)
    registration_status = Column(String(50), default="Active")
    asqa_registration = Column(String(100))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    users = relationship("User", back_populates="rto")
    qualifications = relationship("Qualification", back_populates="rto", cascade="all, delete")
    campuses = relationship("Campus", back_populates="rto", cascade="all, delete") 
    cohorts = relationship("Cohort", back_populates="rto")
    trainers = relationship("Trainer", back_populates="rto")
    

