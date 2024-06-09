'use client'
import { useEffect, useRef } from 'react'

const TestPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (scrollTop + clientHeight >= scrollHeight) {

      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div
      className='flex gap-x-4 h-[2000px]'
      ref={containerRef}
      style={{ overflowY: 'scroll', height: '500px' }}
    >
      <div style={{ height: '1800px' }}>Content goes here</div>
      <div style={{ height: '200px', backgroundColor: 'lightgray' }}>
        This is the bottom of the container
      </div>
    </div>
  )
}

export default TestPage
