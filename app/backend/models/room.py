from sqlalchemy import Column, Integer, String, Boolean, Date, Time, Text, ForeignKey, ARRAY, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True)
    campus_id = Column(Integer, ForeignKey("campuses.id", ondelete="CASCADE"))
    name = Column(String(50), nullable=False)
    code = Column(String(20))
    room_type = Column(String(30), default="classroom")
    capacity = Column(Integer, default=20)
    equipment = Column(ARRAY(Text))
    features = Column(ARRAY(Text))
    accessibility_features = Column(ARRAY(Text))
    is_bookable = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    bookings = relationship("RoomBooking", back_populates="room", cascade="all, delete")

class RoomBooking(Base):
    __tablename__ = "room_bookings"

    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE"))
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"))
    booking_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    booking_type = Column(String(20), default="class")
    booked_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String(20), default="confirmed")
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    room = relationship("Room", back_populates="bookings")
