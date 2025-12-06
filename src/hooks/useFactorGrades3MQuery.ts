import { useQuery } from '@tanstack/react-query'
import { getFactorGrades3M } from '../api/factorGrades'
import { normalize3M } from '../utils/normalizeFactorGrades'
import type { FactorGradesNormalized } from '../types/factorGrades'

export const useFactorGrades3MQuery = (isPremiumUser: boolean) => {
  return useQuery<FactorGradesNormalized>({
    queryKey: ['factor-grades', 'threeM'],
    queryFn: async () => {
      const raw = await getFactorGrades3M()
      return normalize3M(raw)
    },
    enabled: isPremiumUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: 180000 // Poll every 3 minutes
  })
}
