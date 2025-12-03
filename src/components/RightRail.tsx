import { lazy, Suspense } from 'react'
import { X } from 'lucide-react'
import { useUserQuery } from '../hooks/useUserQuery'

const RatingsSummary = lazy(() => import('./RatingsSummary/RatingsSummary'))

interface Props {
  isOpen?: boolean
  onClose?: () => void
}

const RightRail = ({ isOpen = false, onClose }: Props) => {
  const { data: user, isLoading, isError, error } = useUserQuery()
  const isPremiumUser = user?.premium ?? false

  const content = (
    <div>
      {isLoading && (
        <div className='p-4 font-semibold text-2xl text-[#757575]'>
          Loading...
        </div>
      )}

      {isError && (
        <div className='p-4 font-semibold text-2xl text-red-500'>
          {error instanceof Error ? error.message : 'Something went wrong.'}
        </div>
      )}

      {isPremiumUser && (
        <Suspense
          fallback={
            <div className='h-[170px] bg-white shadow animate-pulse w-full' />
          }
        >
          <RatingsSummary isPremiumUser={isPremiumUser} />
        </Suspense>
      )}
    </div>
  )

  return (
    <>
      <aside className='hidden md:block h-screen w-[350px] bg-[#F5F2F1] p-4 fixed right-0 top-0 overflow-y-auto'>
        {content}
      </aside>

      {isOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-[#F5F2F1] p-4 transform transition-transform duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex justify-end mt-1 mb-5'>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {content}
          </div>
        </div>
      )}
    </>
  )
}

export default RightRail
