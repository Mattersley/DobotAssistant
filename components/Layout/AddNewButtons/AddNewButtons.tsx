import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'

import Tooltip from '../Tooltip/Tooltip'
import { IconRefresh } from '../Menu/Menu.svg'

interface AddNewButtonsPropTypes {
  refresh: () => void,
  setOpenNewModal: (boolean: boolean) => void,
  title: string,
  top: 'auto' | number
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

const AddNewButtons = ({
  refresh, setOpenNewModal, title, top,
}: AddNewButtonsPropTypes) => (
  <div className={classNames(
    'absolute flex w-30 items-center right-20 shadow-sm z-50',
    top === 'auto' ? 'top-auto' : `top-${top}`,
  )}
  >
    <button
      className="bg-green-50 flex-none w-full border-l border-t border-b border-gray-300 text-base font-medium text-green-700 rounded-l-md text-black bg-green-50 hover:bg-white px-1 py-2"
      onClick={() => setOpenNewModal(true)}
      type="button"
    >
      <div className="flex flex-row align-middle justify-evenly">
        <PlusIcon width={22} />
        <p>{title}</p>
      </div>
    </button>
    <Tooltip content="Refresh content" placement="bottom">
      <button
        className="w-full border text-base font-medium rounded-r-md border-gray-300 text-black bg-gray-50 text-gray-700 hover:bg-white px-4 py-2 shadow-sm"
        onClick={refresh}
        type="button"
      >
        <IconRefresh />
      </button>
    </Tooltip>
  </div>
)

export default AddNewButtons
