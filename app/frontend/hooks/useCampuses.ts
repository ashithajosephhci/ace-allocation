import { useEffect, useState } from "react";
import { Campus, fetchCampusesForCurrentRTO } from "../providers/campusProvider";

export const useCampuses = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampusesForCurrentRTO()
      .then((data) => setCampuses(data))
      .finally(() => setLoading(false));
  }, []);

  return { campuses, loading };
};
