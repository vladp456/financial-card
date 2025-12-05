import { API_BASE_URL, ENDPOINTS } from '../constants/api'
import type { RankingDetails } from '../types/quantRanking'

export const getQuantRanking = async (): Promise<RankingDetails> => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.QUANT_RANKING}`)

  if (!res.ok) throw new Error('Failed to fetch quant ranking.')

  return await res.json()
}
