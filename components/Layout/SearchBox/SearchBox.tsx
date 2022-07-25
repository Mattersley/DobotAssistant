import { SearchIcon } from '@heroicons/react/solid'

const SearchBox = () => (
  <div className="flex flex-row absolute top-6 left-5 text-donutPurple">
    <div className="w-6 h-6 mt-2">
      <SearchIcon />
    </div>
    <input className="hidden sm:block bg-transparent border-none ml-3 rounded-lg active:border-none focus:border-none" placeholder="Search inventory..." type="search" />
  </div>
)

export default SearchBox
