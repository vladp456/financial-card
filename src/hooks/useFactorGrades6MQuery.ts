import { useQuery } from '@tanstack/react-query'
import { getFactorGrades6M } from '../api/factorGrades'
import { normalize6M } from '../utils/normalizeFactorGrades'
import type { FactorGradesNormalized } from '../types/factorGrades'

export const useFactorGrades6MQuery = (isPremiumUser: boolean) => {
  return useQuery<FactorGradesNormalized>({
    queryKey: ['factor-grades', 'sixM'],
    queryFn: async () => {
      const raw = await getFactorGrades6M()
      return normalize6M(raw)
    },
    enabled: isPremiumUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 360000 // Poll every 6 minutes
  })
}
