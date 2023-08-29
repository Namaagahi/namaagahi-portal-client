import { useEffect, useState } from 'react'

const useScrollToTop = () => {
  const [showScrollButtonToTop, setShowScrollButtonToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollThreshold = 200
      setShowScrollButtonToTop(scrollTop > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  
  return { showScrollButtonToTop, handleScrollToTop }
}

export default useScrollToTop