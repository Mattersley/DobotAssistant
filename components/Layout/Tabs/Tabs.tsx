import { useState } from 'react'
import { multipleClassNames } from '../../../shared/helper'

interface TabPropTypes {
    setTab: (tab: string) => void,
    titles: string[]
}

const Tabs = ({ titles, setTab }: TabPropTypes) => {
  const [categories] = useState(titles)
  const [selected, setSelected] = useState('Counts')

  const handleClick = (category: string) => {
    setTab(category)
    setSelected(category)
  }

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <div aria-orientation="horizontal" className="flex p-1 space-x-1 rounded-xl" role="tablist">
        {Object.values(categories).map((category) => (
          <button
            key={category}
            className={multipleClassNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-donutPurple rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-donutPurple ring-white ring-opacity-60',
              selected === category
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-donutPurple hover:text-white',
            )}
            onClick={() => handleClick(category)}
            role="tab"
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
