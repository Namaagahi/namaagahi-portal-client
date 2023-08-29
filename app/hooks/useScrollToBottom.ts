import { useEffect, useState } from 'react'

const useScrollToBottom = () => {
  
  const [showScrollButtonToBottom, setShowScrollButtonToBottom] = useState(false)

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const bodyHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY
      const isBottomVisible = windowHeight + scrollPosition >= bodyHeight
      setShowScrollButtonToBottom(!isBottomVisible)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { showScrollButtonToBottom, handleScrollToBottom }
}

export default useScrollToBottom