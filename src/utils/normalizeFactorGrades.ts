import type { FactorGradesNormalized } from '../types/factorGrades'

export const normalizeNow = (
  data: Record<string, { current: string }>
): FactorGradesNormalized => {
  const result: FactorGradesNormalized = {}

  for (const key in data) {
    result[key] = data[key].current as any
  }

  return result
}

export const normalize3M = (
  data: Record<string, string>
): FactorGradesNormalized => {
  return data as FactorGradesNormalized
}

export const normalize6M = (data: {
  data: [string, string][]
}): FactorGradesNormalized => {
  const result: FactorGradesNormalized = {}

  data.data.forEach(([key, value]) => {
    result[key] = value as any
  })

  return result
}
