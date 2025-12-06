import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import RightRail from './components/RightRail'
import { useUserQuery } from './hooks/useUserQuery'

function App() {
  const { data: user, isLoading, isError, error } = useUserQuery()
  const [isOpen, setIsOpen] = useState(false)

  const isPremiumUser = user?.premium === true

  return (
    <div className='min-h-screen'>
      <header className='fixed top-0 left-0 right-0 lg:right-[350px] flex items-center justify-between p-4 lg:px-10 lg:py-5 bg-white shadow-md z-40'>
        <h1 className='text-2xl font-bold'>App Title</h1>

        <button
          type='button'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className='lg:hidden'
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main className='pt-[72px] lg:pt-[88px] pb-5 px-4 lg:px-10 lg:mr-[350px]'>
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
