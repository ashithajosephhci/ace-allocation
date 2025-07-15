import api from "../lib/axios";

export interface Cohort {
  id: number;
  code: string;
  name?: string;
  intake_date?: string;
  expected_completion_date?: string;
  max_students?: number;
  current_students?: number;
  delivery_mode?: string;
  status?: string;
  notes?: string;
  rto_id: number;
  qualification_id: number;
  campus_id: number;
  coordinator_id?: number;
}

export const fetchCohortsByQualification = async (qualificationId: number): Promise<Cohort[]> => {
  const res = await api.get(`/cohorts/by_qualification/${qualificationId}`);
  return res.data;
};
