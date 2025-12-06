import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useUserQuery } from '../hooks/useUserQuery'
import { getUser } from '../api/user'

vi.mock('../api/user')

describe('useUserQuery', () => {
  let queryClient: QueryClient

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

  it('fetches user successfully', async () => {
    vi.mocked(getUser).mockResolvedValue({ premium: true })

    const { result } = renderHook(() => useUserQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({ premium: true })
  })

  it('handles error', async () => {
    vi.mocked(getUser).mockRejectedValue(new Error('Failed'))

    const { result } = renderHook(() => useUserQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeInstanceOf(Error)
  })
})
