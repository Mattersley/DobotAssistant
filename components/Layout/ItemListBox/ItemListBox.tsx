import React, { useEffect, useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { camelize, multipleClassNames } from '../../../shared/helper'

interface InventoryItemListBoxPropTypes {
  className?: string,
  handleChange: (event: { target: { name: string; value: string; }; }) => void,
  listItems: string[],
  placeholder: string,
  title: string
}

const ItemListBox = ({
  className, handleChange, listItems, placeholder, title,
}: InventoryItemListBoxPropTypes) => {
  const [selected, setSelected] = useState(placeholder)
  const [open, setOpen] = useState(false)

  const handleClick = (item: string) => {
    setSelected(item)
    setOpen(!open)
  }

  useEffect(() => {
    handleChange({ target: { name: camelize(title), value: selected } })
  }, [handleChange, selected, title])

  return (
    <div className={className !== undefined ? multipleClassNames(className, 'w-full') : 'w-full'}>
      <label className="block text-sm font-medium text-gray-700" htmlFor="listBox">
        {title}
      </label>
      <div>
        <div className="relative" id="listBox">
          <button
            className="relative w-full py-3 pl-3 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                aria-hidden="true"
                className="w-5 h-5 text-gray-400"
              />
            </span>
          </button>
          {open ? (
            <>
              <div
                className="fixed inset-0 transition-opacity"
                role="dialog"
              >
                <button
                  className="w-screen h-screen border-none cursor-default"
                  id="modalClose"
                  onClick={() => setOpen(false)}
                  onKeyDown={() => setOpen(false)}
                  type="button"
                >
                  <label className="hidden" htmlFor="modalClose">Close Listbox</label>
                </button>
              </div>
              <ul
                className="absolute bottom-12 w-auto py-2 h-auto overflow-visible bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {Object.values(listItems).map((item) => (
                  <button
                    key={item}
                    className="hover:bg-donutPink hover:text-white w-full text-left cursor-default select-none relative py-2 pl-10 pr-4"
                    onClick={() => handleClick(item)}
                    onKeyDown={() => handleClick(item)}
                    type="button"
                    value={item}
                  >
                    <span className="block truncate">{item}</span>
                    {selected === item ? (
                      <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

ItemListBox.defaultProps = {
  className: '',
}

export default ItemListBox
