import api from "../lib/axios";


export interface TrainerSpecialization {
  id?: number;
  unit_id: number;
  proficiency_level?: string;
  years_experience?: number;
  last_taught?: string; // ISO format
  created_at?: string;
}

export interface Trainer {
  id?: number;
  user_id?: number;
  rto_id: number;
  employee_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  qualifications?: string[];
  specializations?: string[];
  experience_years?: number;
  contract_type?: string;
  hourly_rate?: number;
  max_hours_per_week?: number;
  is_active?: boolean;
  hire_date?: string; // ISO format
  notes?: string;
  created_at?: string;
  updated_at?: string;
  specializations_rel?: TrainerSpecialization[];
}

export const fetchTrainersByRTO = async (rtoId: number): Promise<Trainer[]> => {
  const res = await api.get(`/trainers/rto/${rtoId}`);
  return res.data;
};

export const fetchTrainerById = async (trainerId: number): Promise<Trainer> => {
  const res = await api.get(`/trainers/${trainerId}`);
  return res.data;
};

export const createTrainer = async (data: Partial<Trainer>): Promise<Trainer> => {
  const res = await api.post("/trainers", data);
  return res.data;
};

export const updateTrainer = async (trainerId: number, data: Partial<Trainer>): Promise<Trainer> => {
  const res = await api.put(`/trainers/${trainerId}`, data);
  return res.data;
};

export const deleteTrainer = async (trainerId: number): Promise<void> => {
  await api.delete(`/trainers/${trainerId}`);
};

export const addSpecialization = async (trainerId: number, data: TrainerSpecialization): Promise<TrainerSpecialization> => {
  const res = await api.post(`/trainers/${trainerId}/specializations`, data);
  return res.data;
};

export const getSpecializations = async (trainerId: number): Promise<TrainerSpecialization[]> => {
  const res = await api.get(`/trainers/${trainerId}/specializations`);
  return res.data;
};
