from sqlalchemy.orm import Session
from models.room import Room, RoomBooking
from schemas.room import RoomCreate, RoomUpdate, RoomBookingCreate

def create_room(db: Session, room: RoomCreate):
    db_room = Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def get_rooms_by_campus(db: Session, campus_id: int):
    return db.query(Room).filter(Room.campus_id == campus_id).all()

def update_room(db: Session, room_id: int, update: RoomUpdate):
    room = db.query(Room).filter(Room.id == room_id).first()
    if room:
        for field, value in update.dict(exclude_unset=True).items():
            setattr(room, field, value)
        db.commit()
        db.refresh(room)
    return room

def delete_room(db: Session, room_id: int):
    room = db.query(Room).filter(Room.id == room_id).first()
    if room:
        db.delete(room)
        db.commit()

def create_booking(db: Session, booking: RoomBookingCreate):
    db_booking = RoomBooking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings_by_room(db: Session, room_id: int):
    return db.query(RoomBooking).filter(RoomBooking.room_id == room_id).all()
