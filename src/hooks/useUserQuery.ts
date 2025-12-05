import { useQuery } from '@tanstack/react-query'
import type { User } from '../types/user'
import { getUser } from '../api/user'

export const useUserQuery = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
