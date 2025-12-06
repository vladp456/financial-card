import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useRatingsSummaryQuery } from '../hooks/useRatingsSummaryQuery'
import { getRatingsSummary } from '../api/ratings'
import type { RatingsSummary } from '../types/rating'

vi.mock('../api/ratings')

describe('useRatingsSummaryQuery', () => {
  let queryClient: QueryClient

  const mockRatingsSummary: RatingsSummary = {
    SA_Analysts: { rating: 'BUY', score: 4.5 },
    Wall_Street: { rating: 'HOLD', score: 3.2 },
    Quant: { rating: 'SELL', score: 2.1 }
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

  it('should fetch ratings summary successfully when user is premium', async () => {
    vi.mocked(getRatingsSummary).mockResolvedValue(mockRatingsSummary)

    const { result } = renderHook(() => useRatingsSummaryQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockRatingsSummary)
    expect(getRatingsSummary).toHaveBeenCalledTimes(1)
  })

  it('should not fetch when user is not premium', () => {
    vi.mocked(getRatingsSummary).mockResolvedValue(mockRatingsSummary)

    const { result } = renderHook(() => useRatingsSummaryQuery(false), {
      wrapper
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(getRatingsSummary).not.toHaveBeenCalled()
  })

  it('should handle error when fetching ratings summary fails', async () => {
    const error = new Error('Failed to fetch ratings summary')
    vi.mocked(getRatingsSummary).mockRejectedValue(error)

    const { result } = renderHook(() => useRatingsSummaryQuery(true), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})
