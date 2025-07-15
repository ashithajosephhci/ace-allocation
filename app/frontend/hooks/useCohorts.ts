import { useEffect, useState } from "react";
import { fetchCohortsByQualification, Cohort } from "../providers/cohortProvider";

export function useCohorts(qualificationId?: number) {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qualificationId) return;

    setLoading(true);
    setError(null);

    fetchCohortsByQualification(qualificationId)
      .then((data) => setCohorts(data))
      .catch((err) => {
        console.error("Failed to fetch cohorts:", err);
        setError("Failed to load cohorts");
        setCohorts([]);
      })
      .finally(() => setLoading(false));
  }, [qualificationId]);

  return { cohorts, loading, error };
}
