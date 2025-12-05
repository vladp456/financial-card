import { useQuery } from '@tanstack/react-query'
import { getRatingsSummary } from '../api/ratings'
import type { RatingsSummary } from '../types/rating'

export const useRatingsSummaryQuery = (isPremiumUser: boolean) => {
  return useQuery<RatingsSummary>({
    queryKey: ['ratings-summary'],
    queryFn: getRatingsSummary,
    enabled: isPremiumUser,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
