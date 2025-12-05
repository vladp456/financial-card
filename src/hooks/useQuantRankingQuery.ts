import { useQuery } from '@tanstack/react-query'
import { getQuantRanking } from '../api/quantRanking'
import type { RankingDetails } from '../types/quantRanking'

export const useQuantRankingQuery = () => {
  return useQuery<RankingDetails>({
    queryKey: ['quant-ranking'],
    queryFn: getQuantRanking,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
