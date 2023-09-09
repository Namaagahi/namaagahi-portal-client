import usePageSearch from '@/app/hooks/usePageSearch'
import { RiFileSearchFill } from 'react-icons/ri'

const SearchContainer = () => {

  const {
    searchText,
    searchResult,
    searchInputRef,
    handleSearch,
    handleSearchInputChange,
    handleKeyDown
  } = usePageSearch()

  return (
    <div className="flex gap-3 items-center mb-3">
      <input
        className='form-input'
        ref={searchInputRef}
        type="text"
        value={searchText}
        onChange={handleSearchInputChange} 
        onKeyDown={handleKeyDown}
        placeholder="جستجو"
      />
      <RiFileSearchFill 
        onClick={handleSearch}
        className='text-5xl hover:text-bgform transition-all duration-300 cursor-pointer'
      />
  </div>
  )
}

export default SearchContainer