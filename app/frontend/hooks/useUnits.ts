import { useEffect, useState } from "react"
import { getUnitsForQualification, Unit } from "../providers/unitProvider"

export function useUnits(qualificationId: number | null) {
  const [loading, setLoading] = useState(false)
  const [units, setUnits] = useState<Unit[]>([])

  useEffect(() => {
    if (!qualificationId) return
    setLoading(true)
    getUnitsForQualification(qualificationId)
      .then(setUnits)
      .finally(() => setLoading(false))
  }, [qualificationId])

  return { units, loading }
}
