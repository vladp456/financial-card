import { useQuery } from '@tanstack/react-query'
import type { User } from '../types/user'
import { getUser } from '../api/user'

export const useUserQuery = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false
  })
}
