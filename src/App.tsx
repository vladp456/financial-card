import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import RightRail from './components/RightRail'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='md:mr-[350px]'>
      <header className='flex items-center justify-between p-4 lg:px-10 lg:py-5 bg-white shadow-md'>
        <h1 className='text-2xl font-bold'>App Title</h1>

        <button
          type='button'
          className='block md:hidden'
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <main className='px-10 py-5'>Main Content</main>

      <RightRail isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default App
