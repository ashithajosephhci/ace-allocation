import useSWR from "swr"
import { fetchTrainersByRTO , Trainer } from "@/app/frontend/providers/trainer"

export function useTrainers(rtoId?: number) {
  const shouldFetch = !!rtoId
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/trainers/rto/${rtoId}` : null,
    () => fetchTrainersByRTO(rtoId!)
  )

  return {
    trainers: data as Trainer[] | undefined,
    isLoading,
    isError: !!error,
    refreshTrainers: mutate,
  }
}
