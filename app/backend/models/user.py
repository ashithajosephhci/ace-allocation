from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP, CheckConstraint, ForeignKey
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    user_type = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    rto_id = Column(Integer, ForeignKey("rtos.id"), nullable=True)
    rto = relationship("RTO", back_populates="users")
    coordinated_cohorts = relationship("Cohort", back_populates="coordinator", lazy="selectin")

    __table_args__ = (
        CheckConstraint("user_type IN ('super_admin', 'rto_manager', 'trainer', 'student')", name="user_type_check"),
    )
