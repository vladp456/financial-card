import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import RightRail from './components/RightRail'
import { useUserQuery } from './hooks/useUserQuery'

function App() {
  const { data: user, isLoading, isError, error } = useUserQuery()
  const [isOpen, setIsOpen] = useState(false)

  const isPremiumUser = user?.premium === true

  return (
    <div className='lg:mr-[350px]'>
      <header className='flex items-center justify-between p-4 lg:px-10 lg:py-5 bg-white shadow-md'>
        <h1 className='text-2xl font-bold'>App Title</h1>

        <button
          type='button'
          aria-label={isOpen ? 'Close' : 'Open'}
          className='block lg:hidden'
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main className='px-10 py-5'>
        {isLoading && (
          <div className='font-semibold text-2xl text-gray'>
            Loading user...
          </div>
        )}

        {isError && (
          <div className='font-semibold text-2xl text-red-500'>
            {error instanceof Error ? error.message : 'Failed to load user.'}
          </div>
        )}
      </main>

      <RightRail
        isPremiumUser={isPremiumUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export default App
