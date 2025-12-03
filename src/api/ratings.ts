import { API_BASE_URL, ENDPOINTS } from '../constants/api'
import type { RatingsSummary } from '../types/rating'

export const getRatingsSummary = async (): Promise<RatingsSummary> => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.RATINGS_SUMMARY}`)

  if (!res.ok) throw new Error('Failed to fetch ratings summary.')

  return await res.json()
}
