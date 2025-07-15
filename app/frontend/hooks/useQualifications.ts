// hooks/useQualifications.ts
import { useEffect, useState } from "react"
import { getQualificationsForRTO } from "@/app/frontend/providers/qualificationProvider"
import type { Qualification } from "@/app/frontend/providers/qualificationProvider"

export function useQualifications() {
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQualificationsForRTO()
      .then(setQualifications)
      .catch((error) => console.error("Failed to load qualifications", error))
      .finally(() => setLoading(false))
  }, [])

  return { qualifications, loading }
}
