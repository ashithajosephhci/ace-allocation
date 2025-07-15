"use client"

import axios from "axios"
import api from "../lib/axios"

export interface Qualification {
  id: number
  code: string
  title: string
  level?: string
  training_package?: string
  duration_weeks?: number
  total_hours?: number
  core_units?: number
  elective_units?: number
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getQualificationsForRTO(): Promise<Qualification[]> {
  const token = localStorage.getItem("access_token")
  const res = await api.get("/qualifications/rto", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
