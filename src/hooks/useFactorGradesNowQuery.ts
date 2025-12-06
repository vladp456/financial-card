import { useQuery } from '@tanstack/react-query'
import { getFactorGradesNow } from '../api/factorGrades'
import { normalizeNow } from '../utils/normalizeFactorGrades'
import type { FactorGradesNormalized } from '../types/factorGrades'

export const useFactorGradesNowQuery = (isPremiumUser: boolean) => {
  return useQuery<FactorGradesNormalized>({
    queryKey: ['factor-grades', 'now'],
    queryFn: async () => {
      const raw = await getFactorGradesNow()
      return normalizeNow(raw)
    },
    enabled: isPremiumUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: 5000 // Poll every 5 seconds
  })
}
