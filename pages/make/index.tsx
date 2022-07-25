import { useState } from 'react'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import Tabs from '../../components/Layout/Tabs/Tabs'
import Recipes from '../../components/Make/Recipes/Recipes'
import Counts from '../../components/Make/Counts/Counts'
import Tooltip from '../../components/Layout/Tooltip/Tooltip'

const Make = () => {
  const [tab, setTab] = useState('Counts')

  return (
    <>
      <div className="fixed flex align-middle items-center px-6 w-full md:w-mainWidth h-16 border bg-gray-50 shadow-sm z-40">
        <p className="hidden sm:block mt-2 text-xl font-medium leading-6 text-donutPurple sm:mr-6">Make </p>
        <Tooltip content="Start this week's make" placement="bottom">
          <button
            className="w-10 rounded-xl shadow text-white bg-green-50 border border-gray-300 text-base font-medium text-green-700 text-black bg-green-50 hover:bg-white p-2 sm:mr-3"
            type="button"
          >
            <ChevronDoubleRightIcon width={22} />
          </button>
        </Tooltip>
        <Tabs setTab={setTab} titles={['Counts', 'Recipes', 'Fry']} />
      </div>
      {tab === 'Counts' && <Counts />}
      {tab === 'Recipes' && <Recipes />}
    </>
  )
}

export default Make
