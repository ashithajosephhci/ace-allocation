import api from "../lib/axios";

export interface Class {
  id?: number;
  rto_id: number;
  qualification_id: number;
  unit_id: number;
  cohort_id: number;
  campus_id: number;
  trainer_id: number;
  room_id: number;
  title: string;
  description?: string;
  class_type?: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_minutes?: number;
  max_students?: number;
  enrolled_students?: number;
  delivery_mode?: string;
  status?: string;
  resources_required?: string[];
  assessment_type?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClassAllocation {
  id?: number;
  class_id: number;
  student_id: number;
  cohort_id: number;
  enrollment_date?: string;
  attendance_status?: string;
  grade?: string;
  assessment_result?: string;
  feedback?: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchClassesByRTO = async (rtoId: number): Promise<Class[]> => {
  const res = await api.get(`/classes/rto/${rtoId}`);
  return res.data;
};

export const createClass = async (data: Partial<Class>): Promise<Class> => {
  const res = await api.post("/classes", data);
  return res.data;
};

export const updateClass = async (classId: number, data: Partial<Class>): Promise<Class> => {
  const res = await api.put(`/classes/${classId}`, data);
  return res.data;
};

export const deleteClass = async (classId: number): Promise<void> => {
  await api.delete(`/classes/${classId}`);
};

export const fetchAllocations = async (classId: number): Promise<ClassAllocation[]> => {
  const res = await api.get(`/classes/${classId}/allocations`);
  return res.data;
};

export const allocateStudent = async (data: Partial<ClassAllocation>): Promise<ClassAllocation> => {
  const res = await api.post(`/classes/allocations`, data);
  return res.data;
};

// ✅ NEW: For assigning trainer or room
export const createClassAllocation = async (data: {
  class_id: number;
  trainer_id?: number;
  room_id?: number;
}): Promise<void> => {
  await api.post("/class-allocations", data);
};
