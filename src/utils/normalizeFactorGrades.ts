import type { FactorGradesNormalized, LetterGrade } from '../types/factorGrades'

export const normalizeNow = (
  data: Record<string, { current: LetterGrade }>
): FactorGradesNormalized =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.current])
  )

export const normalize3M = (
  data: Record<string, LetterGrade>
): FactorGradesNormalized => data

export const normalize6M = (data: {
  data: [string, LetterGrade][]
}): FactorGradesNormalized => Object.fromEntries(data.data)
