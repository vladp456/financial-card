import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useFactorGrades6MQuery } from '../hooks/useFactorGrades6MQuery'
import { getFactorGrades6M } from '../api/factorGrades'
import type { FactorGradesNormalized, LetterGrade } from '../types/factorGrades'

vi.mock('../api/factorGrades')

describe('useFactorGrades6MQuery', () => {
  let queryClient: QueryClient

  const mockRawData = {
    data: [
      ['momentum', 'B+'],
      ['value', 'B-'],
      ['quality', 'C+']
    ] as [string, LetterGrade][]
  }

  const expectedNormalizedData: FactorGradesNormalized = {
    momentum: 'B+',
    value: 'B-',
    quality: 'C+'
  }

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    })
    vi.clearAllMocks()
  })

  function wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  it('should fetch and normalize factor grades for 6M when user is premium', async () => {
    vi.mocked(getFactorGrades6M).mockResolvedValue(mockRawData)

    const { result } = renderHook(() => useFactorGrades6MQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(expectedNormalizedData)
    expect(getFactorGrades6M).toHaveBeenCalledTimes(1)
  })

  it('should not fetch when user is not premium', () => {
    vi.mocked(getFactorGrades6M).mockResolvedValue(mockRawData)

    const { result } = renderHook(() => useFactorGrades6MQuery(false), {
      wrapper
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(getFactorGrades6M).not.toHaveBeenCalled()
  })

  it('should handle error when fetching factor grades fails', async () => {
    const error = new Error('Failed to fetch factor grades')
    vi.mocked(getFactorGrades6M).mockRejectedValue(error)

    const { result } = renderHook(() => useFactorGrades6MQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})
