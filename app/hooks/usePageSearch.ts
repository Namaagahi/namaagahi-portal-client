import { useEffect, useRef, useState } from 'react'

const usePageSearch = () => {

  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus()
  }, [])

  const handleSearch = () => {
    if (searchText) {
      const found = (window as any).find(searchText, false, false, true)
      setSearchResult(found)
    } else {
      setSearchResult(false)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch()
  }

  return { searchText, searchInputRef, searchResult, handleSearch, handleSearchInputChange, handleKeyDown }
}

export default usePageSearch