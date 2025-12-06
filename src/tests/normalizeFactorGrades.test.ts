import { describe, it, expect } from 'vitest'
import type { FactorGradesNormalized, LetterGrade } from '../types/factorGrades'
import {
  normalize3M,
  normalize6M,
  normalizeNow
} from '../utils/normalizeFactorGrades'

describe('normalizeFactorGrades utils', () => {
  const sampleNowData: Record<string, { current: LetterGrade }> = {
    factor1: { current: 'A' },
    factor2: { current: 'B+' },
    factor3: { current: 'C-' }
  }

  const sample3MData: Record<string, LetterGrade> = {
    factor1: 'A',
    factor2: 'B+',
    factor3: 'C-'
  }

  const sample6MData = {
    data: [
      ['factor1', 'A'],
      ['factor2', 'B+'],
      ['factor3', 'C-']
    ] as [string, LetterGrade][]
  }

  it('normalizeNow should extract current grades', () => {
    const result: FactorGradesNormalized = normalizeNow(sampleNowData)
    expect(result).toEqual({
      factor1: 'A',
      factor2: 'B+',
      factor3: 'C-'
    })
  })

  it('normalize3M should return the same data', () => {
    const result: FactorGradesNormalized = normalize3M(sample3MData)
    expect(result).toEqual(sample3MData)
  })

  it('normalize6M should convert array of tuples to record', () => {
    const result: FactorGradesNormalized = normalize6M(sample6MData)
    expect(result).toEqual({
      factor1: 'A',
      factor2: 'B+',
      factor3: 'C-'
    })
  })

  it('normalizeNow should return an empty object if input is empty', () => {
    expect(normalizeNow({})).toEqual({})
  })

  it('normalize3M should return an empty object if input is empty', () => {
    expect(normalize3M({})).toEqual({})
  })

  it('normalize6M should return an empty object if input array is empty', () => {
    expect(normalize6M({ data: [] })).toEqual({})
  })
})
