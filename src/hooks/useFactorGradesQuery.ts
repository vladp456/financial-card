import { useFactorGradesNowQuery } from './useFactorGradesNowQuery'
import { useFactorGrades3MQuery } from './useFactorGrades3MQuery'
import { useFactorGrades6MQuery } from './useFactorGrades6MQuery'
import type { FactorGradesNormalized } from '../types/factorGrades'

type FactorGradesResult = {
  now: FactorGradesNormalized | undefined
  threeM: FactorGradesNormalized | undefined
  sixM: FactorGradesNormalized | undefined
}

export const useFactorGradesQuery = (isPremiumUser: boolean) => {
  const nowQuery = useFactorGradesNowQuery(isPremiumUser)
  const threeMQuery = useFactorGrades3MQuery(isPremiumUser)
  const sixMQuery = useFactorGrades6MQuery(isPremiumUser)

  const data: FactorGradesResult = {
    now: nowQuery.data,
    threeM: threeMQuery.data,
    sixM: sixMQuery.data
  }

  const isLoading =
    nowQuery.isLoading || threeMQuery.isLoading || sixMQuery.isLoading
  const isError = nowQuery.isError || threeMQuery.isError || sixMQuery.isError
  const error = nowQuery.error || threeMQuery.error || sixMQuery.error

  return {
    data,
    isLoading,
    isError,
    error
  }
}
