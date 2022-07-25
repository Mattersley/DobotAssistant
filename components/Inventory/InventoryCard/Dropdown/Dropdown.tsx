import { useState } from 'react'
import {
  CheckIcon,
  ClockIcon, DuplicateIcon, PencilIcon, PlusIcon, SwitchVerticalIcon, TrashIcon, XIcon,
} from '@heroicons/react/solid'
import { IconHamburger } from '../InventoryCard.svg'

interface InventoryCardDropdownProps {
  handleDelete: () => void,
  type: 'inventory' | 'recipe'
}

const CardDropdown = ({ handleDelete, type }: InventoryCardDropdownProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          className="inline-flex justify-center border-none py-2 font-medium text-gray-300"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <IconHamburger />
        </button>
      </div>
      {open && (
      <>
        <button
          className="cursor-default top-0 right-0 fixed w-screen h-screen"
          id="modalBackground"
          onClick={() => {
            setOpen(false)
            setConfirmDelete(false)
          }}
          type="button"
        >
          <label className="hidden" htmlFor="modalBackground">Modal Background</label>
        </button>
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {type === 'inventory' && (
            <>
              <button
                className="w-full hover:bg-gray-100 hover:text-gray-900 flex text-gray-700 block px-4 py-2 text-sm"
                type="button"
              >
                <PlusIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-gray-700" />
                Add Supplier
              </button>
              <button className="w-full hover:bg-gray-100 hover:text-gray-900 flex text-gray-700 block px-4 py-2 text-sm" type="button">
                <SwitchVerticalIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-gray-700" />
                Change Par Level
              </button>
              <button className="w-full hover:bg-gray-100 hover:text-gray-900 flex text-gray-700 block px-4 py-2 text-sm" type="button">
                <ClockIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-gray-700" />
                History
              </button>
            </>
            )}
            <button className="w-full hover:bg-gray-100 hover:text-gray-900 flex text-gray-700 block px-4 py-2 text-sm" type="button">
              <DuplicateIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-gray-700" />
              Duplicate
            </button>
            {type === 'recipe'
              && (
              <button
                className="w-full hover:bg-gray-100 hover:text-gray-900 flex text-gray-700 block px-4 py-2 text-sm"
                type="button"
              >
                <PencilIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-gray-700" />
                Edit
              </button>
              )}

            <div className="border-t-2 border-gray-100 w-3/4 mx-auto" />
            <div
              className="w-full hover:bg-red-100 hover:text-red-900 flex text-red-700 block px-4 py-2 text-sm"
              onClick={() => setConfirmDelete(true)}
              onKeyDown={() => setConfirmDelete(true)}
              role="button"
              tabIndex={0}
            >
              {confirmDelete ? (
                <div className="flex flex-row align-middle justify-between w-full">
                  <p>Are you sure?</p>
                  <div
                    className="flex flex-row"
                    onClick={() => {
                      setOpen(false)
                      setConfirmDelete(false)
                    }}
                    onKeyDown={() => {
                      setOpen(false)
                      setConfirmDelete(false)
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="w-5 h-5">
                      <XIcon />
                    </div>
                    <button className="w-5 h-5 text-green-700" onClick={handleDelete} type="button">
                      <CheckIcon />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <TrashIcon aria-hidden="true" className="h-4 w-4 mr-1 mt-px text-red-700" />
                  Delete
                </>
              )}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default CardDropdown
