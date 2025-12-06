import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useFactorGradesQuery } from '../hooks/useFactorGradesQuery'
import * as useFactorGradesNowQuery from '../hooks/useFactorGradesNowQuery'
import * as useFactorGrades3MQuery from '../hooks/useFactorGrades3MQuery'
import * as useFactorGrades6MQuery from '../hooks/useFactorGrades6MQuery'
import type { FactorGradesNormalized } from '../types/factorGrades'

vi.mock('../hooks/useFactorGradesNowQuery')
vi.mock('../hooks/useFactorGrades3MQuery')
vi.mock('../hooks/useFactorGrades6MQuery')

describe('useFactorGradesQuery', () => {
  let queryClient: QueryClient

  const mockNowData: FactorGradesNormalized = {
    momentum: 'A',
    value: 'B+',
    quality: 'C-'
  }

  const mock3MData: FactorGradesNormalized = {
    momentum: 'A-',
    value: 'B',
    quality: 'C'
  }

  const mock6MData: FactorGradesNormalized = {
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

  it('should return all three queries data when premium user', () => {
    vi.spyOn(
      useFactorGradesNowQuery,
      'useFactorGradesNowQuery'
    ).mockReturnValue({
      data: mockNowData,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    vi.spyOn(useFactorGrades3MQuery, 'useFactorGrades3MQuery').mockReturnValue({
      data: mock3MData,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    vi.spyOn(useFactorGrades6MQuery, 'useFactorGrades6MQuery').mockReturnValue({
      data: mock6MData,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    const { result } = renderHook(() => useFactorGradesQuery(true), { wrapper })

    expect(result.current.data).toEqual({
      now: mockNowData,
      threeM: mock3MData,
      sixM: mock6MData
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should return loading true when any query is loading', () => {
    vi.spyOn(
      useFactorGradesNowQuery,
      'useFactorGradesNowQuery'
    ).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null
    } as any)

    vi.spyOn(useFactorGrades3MQuery, 'useFactorGrades3MQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    vi.spyOn(useFactorGrades6MQuery, 'useFactorGrades6MQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    const { result } = renderHook(() => useFactorGradesQuery(true), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return error when any query has error', () => {
    const error = new Error('Failed to fetch')

    vi.spyOn(
      useFactorGradesNowQuery,
      'useFactorGradesNowQuery'
    ).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: error
    } as any)

    vi.spyOn(useFactorGrades3MQuery, 'useFactorGrades3MQuery').mockReturnValue({
      data: mock3MData,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    vi.spyOn(useFactorGrades6MQuery, 'useFactorGrades6MQuery').mockReturnValue({
      data: mock6MData,
      isLoading: false,
      isError: false,
      error: null
    } as any)

    const { result } = renderHook(() => useFactorGradesQuery(true), { wrapper })

    expect(result.current.isError).toBe(true)
    expect(result.current.error).toEqual(error)
  })

  it('should pass isPremiumUser to all sub-queries', () => {
    const nowSpy = vi
      .spyOn(useFactorGradesNowQuery, 'useFactorGradesNowQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null
      } as any)

    const threeMSpy = vi
      .spyOn(useFactorGrades3MQuery, 'useFactorGrades3MQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null
      } as any)

    const sixMSpy = vi
      .spyOn(useFactorGrades6MQuery, 'useFactorGrades6MQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null
      } as any)

    renderHook(() => useFactorGradesQuery(false), { wrapper })

    expect(nowSpy).toHaveBeenCalledWith(false)
    expect(threeMSpy).toHaveBeenCalledWith(false)
    expect(sixMSpy).toHaveBeenCalledWith(false)
  })
})
