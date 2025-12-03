import { API_BASE_URL, ENDPOINTS } from '../constants/api'
import type { User } from '../types/user'

export const getUser = async (): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.USER}`)

  if (!res.ok) throw new Error('Failed to fetch user.')

  return await res.json()
}
