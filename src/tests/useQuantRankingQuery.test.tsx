import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useQuantRankingQuery } from '../hooks/useQuantRankingQuery'
import { getQuantRanking } from '../api/quantRanking'
import type { RankingDetails } from '../types/quantRanking'

vi.mock('../api/quantRanking')

describe('useQuantRankingQuery', () => {
  let queryClient: QueryClient

  const mockRankingDetails: RankingDetails = {
    sector: 'Technology',
    industry: 'Software',
    rankings: {
      overall: { rank: 42, total: 500 },
      sector: { rank: 15, total: 100 },
      industry_specific: { rank: 8, total: 50 }
    }
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

  it('should fetch quant ranking successfully', async () => {
    vi.mocked(getQuantRanking).mockResolvedValue(mockRankingDetails)

    const { result } = renderHook(() => useQuantRankingQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockRankingDetails)
    expect(getQuantRanking).toHaveBeenCalledTimes(1)
  })

  it('should handle error when fetching quant ranking fails', async () => {
    const error = new Error('Failed to fetch quant ranking')
    vi.mocked(getQuantRanking).mockRejectedValue(error)

    const { result } = renderHook(() => useQuantRankingQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})
