import api from "../lib/axios";

export interface Room {
  id?: number;
  campus_id: number;
  name: string;
  code?: string;
  room_type?: string; // classroom, lab, etc.
  capacity?: number;
  equipment?: string[];
  features?: string[];
  accessibility_features?: string[];
  is_bookable?: boolean;
  is_active?: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RoomBooking {
  id?: number;
  room_id: number;
  class_id: number;
  booking_date: string; // ISO Date (yyyy-mm-dd)
  start_time: string;   // "HH:mm:ss"
  end_time: string;     // "HH:mm:ss"
  booking_type?: string;
  booked_by?: number;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}


export const fetchRoomsByCampus = async (campusId: number): Promise<Room[]> => {
  const res = await api.get(`/rooms/campus/${campusId}`);
  return res.data;
};

export const createRoom = async (data: Partial<Room>): Promise<Room> => {
  const res = await api.post("/rooms", data);
  return res.data;
};

export const updateRoom = async (roomId: number, data: Partial<Room>): Promise<Room> => {
  const res = await api.put(`/rooms/${roomId}`, data);
  return res.data;
};

export const deleteRoom = async (roomId: number): Promise<void> => {
  await api.delete(`/rooms/${roomId}`);
};

export const createRoomBooking = async (data: Partial<RoomBooking>): Promise<RoomBooking> => {
  const res = await api.post(`/rooms/bookings`, data);
  return res.data;
};

export const fetchRoomBookings = async (roomId: number): Promise<RoomBooking[]> => {
  const res = await api.get(`/rooms/${roomId}/bookings`);
  return res.data;
};
