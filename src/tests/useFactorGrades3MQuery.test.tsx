import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useFactorGrades3MQuery } from '../hooks/useFactorGrades3MQuery'
import { getFactorGrades3M } from '../api/factorGrades'
import type { LetterGrade } from '../types/factorGrades'

vi.mock('../api/factorGrades')

describe('useFactorGrades3MQuery', () => {
  let queryClient: QueryClient

  const mockData: Record<string, LetterGrade> = {
    momentum: 'A-',
    value: 'B',
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

  it('should fetch and normalize factor grades for 3M when user is premium', async () => {
    vi.mocked(getFactorGrades3M).mockResolvedValue(mockData)

    const { result } = renderHook(() => useFactorGrades3MQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
    expect(getFactorGrades3M).toHaveBeenCalledTimes(1)
  })

  it('should not fetch when user is not premium', () => {
    vi.mocked(getFactorGrades3M).mockResolvedValue(mockData)

    const { result } = renderHook(() => useFactorGrades3MQuery(false), {
      wrapper
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(getFactorGrades3M).not.toHaveBeenCalled()
  })

  it('should handle error when fetching factor grades fails', async () => {
    const error = new Error('Failed to fetch factor grades')
    vi.mocked(getFactorGrades3M).mockRejectedValue(error)

    const { result } = renderHook(() => useFactorGrades3MQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})
