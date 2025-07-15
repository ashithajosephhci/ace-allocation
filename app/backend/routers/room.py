from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas.room as schemas
import crud.room as crud

router = APIRouter(prefix="/rooms", tags=["Rooms"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.RoomOut)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db, room)

@router.get("/campus/{campus_id}", response_model=list[schemas.RoomOut])
def get_rooms_by_campus(campus_id: int, db: Session = Depends(get_db)):
    return crud.get_rooms_by_campus(db, campus_id)

@router.put("/{room_id}", response_model=schemas.RoomOut)
def update_room(room_id: int, update: schemas.RoomUpdate, db: Session = Depends(get_db)):
    return crud.update_room(db, room_id, update)

@router.delete("/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db)):
    crud.delete_room(db, room_id)
    return {"message": "Room deleted"}

@router.post("/bookings", response_model=schemas.RoomBookingOut)
def create_booking(booking: schemas.RoomBookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db, booking)

@router.get("/{room_id}/bookings", response_model=list[schemas.RoomBookingOut])
def get_bookings(room_id: int, db: Session = Depends(get_db)):
    return crud.get_bookings_by_room(db, room_id)
