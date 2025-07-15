import useSWR from "swr";
import {
  fetchRoomsByCampus,
  fetchRoomBookings,
  createRoomBooking, Room, RoomBooking
} from "@/app/frontend/providers/room";

export const useRooms = (campusId?: number) => {
  const shouldFetch = !!campusId;
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/rooms/campus/${campusId}` : null,
    () => fetchRoomsByCampus(campusId!)
  );

  return {
    rooms: data as Room[] | undefined,
    isLoading,
    isError: error,
    refreshRooms: mutate,
  };
};

export const useRoomBookings = (roomId?: number) => {
  const shouldFetch = !!roomId;
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/rooms/${roomId}/bookings` : null,
    () => fetchRoomBookings(roomId!)
  );

  return {
    bookings: data as RoomBooking[] | undefined,
    isLoading,
    isError: error,
    refreshBookings: mutate,
  };
};

export const useCreateRoomBooking = () => {
  return async (booking: Partial<RoomBooking>) => {
    return await createRoomBooking(booking);
  };
};
