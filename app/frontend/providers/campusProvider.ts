import api from "../lib/axios";


export interface Campus {
  id: number;
  rto_id: number;
  name: string;
  code: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  email?: string;
  facilities?: string[];
  capacity?: number;
  is_active: boolean;
}
export const fetchCampusesForCurrentRTO = async (): Promise<Campus[]> => {
  const res = await api.get("/campuses/rto");
  return res.data;
};
