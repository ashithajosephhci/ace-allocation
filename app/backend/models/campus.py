from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, TIMESTAMP, func
from sqlalchemy.orm import relationship
from database import Base

class Campus(Base):
    __tablename__ = "campuses"

    id = Column(Integer, primary_key=True, index=True)
    rto_id = Column(Integer, ForeignKey("rtos.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    code = Column(String(50), nullable=False)
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(50), nullable=False)
    postcode = Column(String(10), nullable=False)
    country = Column(String(100), default="Australia")
    phone = Column(String(20))
    email = Column(String(255))
    facilities = Column(JSON)
    capacity = Column(Integer)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    # Relationship backref if needed later
    rto = relationship("RTO", back_populates="campuses")
    cohorts = relationship("Cohort", back_populates="campus")
