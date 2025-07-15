import {
  fetchClassesByRTO,
  fetchAllocations,
  allocateStudent,
  createClassAllocation, // ✅ New
  Class,
  ClassAllocation,
} from "@/app/frontend/providers/classProvider";
import useSWR, { KeyedMutator } from "swr"

export const useClasses = (rtoId?: number) => {
  const shouldFetch = !!rtoId;
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/classes/rto/${rtoId}` : null,
    () => fetchClassesByRTO(rtoId!)
  );

  return {
    classes: data as Class[] | undefined,
    isLoading,
    isError: error,
    refreshClasses: mutate,
  };
};

export const useClassAllocations = (classId?: number) => {
  const shouldFetch = !!classId;
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/classes/${classId}/allocations` : null,
    () => fetchAllocations(classId!)
  );

  const createAllocation = async (payload: {
    class_id: number;
    trainer_id?: number;
    room_id?: number;
  }) => {
    await createClassAllocation(payload);
    mutate(); // Refresh allocations after assignment
  };

  return {
    allocations: data as ClassAllocation[] | undefined,
    isLoading,
    isError: error,
    refreshAllocations: mutate,
    createAllocation, // ✅ exposed to UI
  };
};

export const useAllocateStudent = () => {
  return async (data: Partial<ClassAllocation>) => {
    return await allocateStudent(data);
  };
};
