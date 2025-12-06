import { lazy, Suspense, useEffect } from 'react'
import { X } from 'lucide-react'
import TableSkeleton from './shared/TableSkeleton'

const RatingsSummary = lazy(() => import('./RatingsSummary'))
const FactorGrades = lazy(() => import('./FactorGrades'))
const QuantRanking = lazy(() => import('./QuantRanking'))

interface Props {
  isPremiumUser?: boolean
  isOpen?: boolean
  onClose: () => void
}

const RightRail = ({
  isPremiumUser = false,
  isOpen = false,
  onClose
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const content = (
    <div className='flex flex-col gap-4'>
      {isPremiumUser && (
        <>
          <Suspense fallback={<TableSkeleton rowCount={3} className='mb-6' />}>
            <RatingsSummary isPremiumUser={isPremiumUser} />
          </Suspense>

          <Suspense fallback={<TableSkeleton rowCount={6} className='mb-4' />}>
            <FactorGrades isPremiumUser={isPremiumUser} />
          </Suspense>
        </>
      )}

      <Suspense fallback={<TableSkeleton rowCount={7} className='mb-6' />}>
        <QuantRanking />
      </Suspense>
    </div>
  )

  return (
    <>
      <aside className='hidden lg:block fixed right-0 top-0 h-screen w-[350px] bg-[#F5F2F1] p-4 overflow-y-auto overscroll-contain'>
        {content}
      </aside>

      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 z-50 bg-black/20'
          onClick={onClose}
        >
          <div
            role='dialog'
            aria-modal='true'
            className='fixed top-0 right-0 h-full w-80 bg-[#F5F2F1] p-4 overflow-y-auto overscroll-contain shadow-xl'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-end mt-1 mb-5'>
              <button aria-label='Close' onClick={onClose}>
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
