import { useEffect, useRef, useState } from 'react'

const usePageSearch = () => {

  const [searchText, setSearchText] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus()
  }, [])

  const handleSearch = () => {
    if (searchText) {
      const found = (window as any).find(searchText, false, false, true)
      if (!found) alert('Text not found')
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch()
  }

  return { searchText, searchInputRef, handleSearch, handleSearchInputChange, handleKeyDown }
}

export default usePageSearch