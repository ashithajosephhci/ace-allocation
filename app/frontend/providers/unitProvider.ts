import axios from "axios"

export interface Unit {
  id: number
  code: string
  title: string
  description?: string
  nominal_hours?: number
  unit_type?: string
  training_package?: string
  release_version?: string
  is_active: boolean
  created_at: string
  updated_at: string
}
export async function getUnitsForQualification(qualificationId: number): Promise<Unit[]> {
  const token = localStorage.getItem("access_token")
  const res = await axios.get(`/units/by_qualification/${qualificationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
