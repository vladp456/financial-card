import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useFactorGradesNowQuery } from '../hooks/useFactorGradesNowQuery'
import { getFactorGradesNow } from '../api/factorGrades'
import type { FactorGradesNormalized, LetterGrade } from '../types/factorGrades'

vi.mock('../api/factorGrades')

describe('useFactorGradesNowQuery', () => {
  let queryClient: QueryClient

  const mockRawData: Record<string, { current: LetterGrade }> = {
    momentum: { current: 'A' },
    value: { current: 'B+' },
    quality: { current: 'C-' }
  }

  const expectedNormalizedData: FactorGradesNormalized = {
    momentum: 'A',
    value: 'B+',
    quality: 'C-'
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

  it('should fetch and normalize factor grades when user is premium', async () => {
    vi.mocked(getFactorGradesNow).mockResolvedValue(mockRawData)

    const { result } = renderHook(() => useFactorGradesNowQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(expectedNormalizedData)
    expect(getFactorGradesNow).toHaveBeenCalledTimes(1)
  })

  it('should not fetch when user is not premium', () => {
    vi.mocked(getFactorGradesNow).mockResolvedValue(mockRawData)

    const { result } = renderHook(() => useFactorGradesNowQuery(false), {
      wrapper
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(getFactorGradesNow).not.toHaveBeenCalled()
  })

  it('should handle error when fetching factor grades fails', async () => {
    const error = new Error('Failed to fetch factor grades')
    vi.mocked(getFactorGradesNow).mockRejectedValue(error)

    const { result } = renderHook(() => useFactorGradesNowQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})
