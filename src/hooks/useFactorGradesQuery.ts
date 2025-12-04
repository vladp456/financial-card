import { useQuery } from '@tanstack/react-query'
import {
  getFactorGradesNow,
  getFactorGrades3M,
  getFactorGrades6M
} from '../api/factorGrades'
import {
  normalizeNow,
  normalize3M,
  normalize6M
} from '../utils/normalizeFactorGrades'
import type { FactorGradesNormalized } from '../types/factorGrades'

export const useFactorGradesQuery = (isPremiumUser: boolean) => {
  return useQuery<{
    now: FactorGradesNormalized
    threeM: FactorGradesNormalized
    sixM: FactorGradesNormalized
  }>({
    queryKey: ['factor-grades'],
    queryFn: async () => {
      const [nowRaw, threeMRaw, sixMRaw] = await Promise.all([
        getFactorGradesNow(),
        getFactorGrades3M(),
        getFactorGrades6M()
      ])

      return {
        now: normalizeNow(nowRaw),
        threeM: normalize3M(threeMRaw),
        sixM: normalize6M(sixMRaw)
      }
    },
    enabled: isPremiumUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
