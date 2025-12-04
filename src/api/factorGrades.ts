import { API_BASE_URL, ENDPOINTS } from '../constants/api'

export const getFactorGradesNow = async () => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.FACTOR_GRADES_NOW}`)

  if (!res.ok) throw new Error('Failed to fetch Factor Grades (Now).')

  return await res.json()
}

export const getFactorGrades3M = async () => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.FACTOR_GRADES_3M}`)

  if (!res.ok) throw new Error('Failed to fetch Factor Grades (3M).')

  return await res.json()
}

export const getFactorGrades6M = async () => {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.FACTOR_GRADES_6M}`)

  if (!res.ok) throw new Error('Failed to fetch Factor Grades (6M).')

  return await res.json()
}
