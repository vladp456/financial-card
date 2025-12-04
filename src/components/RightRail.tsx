import { lazy, Suspense } from 'react'
import { X } from 'lucide-react'
import TableSkeleton from './shared/TableSkeleton'

const RatingsSummary = lazy(() => import('./RatingsSummary'))
const FactorGrades = lazy(() => import('./FactorGrades'))

interface Props {
  isPremiumUser: boolean
  isOpen: boolean
  onClose: () => void
}

const RightRail = ({
  isPremiumUser = false,
  isOpen = false,
  onClose
}: Props) => {
  const content = (
    <div className='flex flex-col gap-4'>
      {isPremiumUser && (
        <>
          <Suspense fallback={<TableSkeleton rowCount={3} />}>
            <RatingsSummary isPremiumUser={isPremiumUser} />
          </Suspense>

          <Suspense fallback={<TableSkeleton rowCount={5} />}>
            <FactorGrades isPremiumUser={isPremiumUser} />
          </Suspense>
        </>
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
