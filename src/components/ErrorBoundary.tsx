import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
          <h1 className='text-2xl font-bold mb-4'>Something went wrong</h1>
          <p className='text-gray-600 mb-4'>
            Please refresh the page or try again later.
          </p>
          <button
            type='button'
            aria-label='Refresh Page'
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer'
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
