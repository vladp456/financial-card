import { useQuery } from '@tanstack/react-query'
import { getQuantRanking } from '../api/quantRanking'
import type { RankingDetails } from '../types/quantRanking'

export const useQuantRankingQuery = () => {
  return useQuery<RankingDetails>({
    queryKey: ['quant-ranking'],
    queryFn: getQuantRanking,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false
  })
}
