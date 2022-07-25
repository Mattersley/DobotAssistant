import { CheckIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import Tooltip from '../../../Layout/Tooltip/Tooltip'

interface ExpiryDatePropTypes {
    addExpiry: ({ expiryValues }: { expiryValues: { expiryDate: Date; expiryQuantity: number;}; }) => void,
    date: {
        seconds: number,
        nanoseconds: number
    }
}

const ExpiryDate = ({ addExpiry, date }: ExpiryDatePropTypes) => {
  const [showAddExpiry, setShowAddExpiry] = useState(false)
  const [values, setValues] = useState({ expirationDate: Date.now(), expirationQuantity: 0 })

  const handleChange = (event: { target: { name: string, value: Date | number | string } }) => {
    setValues((vals) => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = () => {
    const data = {
      expirationDate: new Date(values.expirationDate),
      expirationQuantity: values.expirationQuantity,
    }
    setShowAddExpiry(false)
  }

  const timestampToDate = (timestamp: ExpiryDatePropTypes['date']) => new Date(timestamp.seconds * 1000).toLocaleDateString('en-gb', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  })

  return (
    <div className="w-full flex flex-col align-middle items-center justify-between">
      <div className="w-full flex flex-col align-middle items-center justify-between">
        <p className="font-mono px-2 py-1 text-xs font-semibold border-b">
          EXPIRY DATES:
          {' '}
        </p>
        <span className="px-2 py-1 mt-2 flex flex-row align-middle items-center justify-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
          {timestampToDate(date)}
        </span>
        <Tooltip
          content="Add expiry date block"
          placement="top"
        >
          <button
            className="w-6 h-6 m-0 mt-2 p-1 text-xs rounded-md font-semibold border border-dashed border-yellow-200 text-yellow-200 bg-white hover:text-white hover:bg-yellow-200"
            onClick={() => setShowAddExpiry(!showAddExpiry)}
            type="button"
          >
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
      <div className="mt-3 w-full flex flex-col sm:flex-row align-middle items-center justify-center sm:justify-between">
        {showAddExpiry
          ? (
            <>
              <Tooltip content="Expiry Date" placement="top">
                <input
                  className="w-full focus:ring-yellow-100 focus:border-yellow-100 h-10 shadow-sm sm:text-sm border-yellow-100 rounded-md"
                  name="expirationDate"
                  onChange={handleChange}
                  placeholder="Expiry Date"
                  type="date"
                />
              </Tooltip>
              <div className="flex flex-row align-middle items-center mt-2 sm:mt-0">
                <Tooltip content="Number of items with that expiry date" placement="top">
                  <input
                    className="ml-2 focus:ring-yellow-100 focus:border-yellow-100 h-10 shadow-sm sm:text-sm border-yellow-100 rounded-md"
                    name="expirationQuantity"
                    onChange={handleChange}
                    placeholder="# items"
                    type="number"
                  />
                </Tooltip>
                <div className="flex flex-col">
                  <Tooltip content="Submit" placement="left">
                    <button
                      className="self-start ml-2 mb-0 rounded rounded-b-none px-1 bg-green-200 w-6 h-6 text-green-700 border-b-0 border-green-500 hover:border-green-700 border hover:bg-white"
                      onClick={handleSubmit}
                      type="button"
                    >
                      <CheckIcon />
                    </button>
                  </Tooltip>
                  <Tooltip content="Cancel" placement="left">
                    <button
                      className="self-end ml-2 rounded rounded-t-none px-1 bg-red-200 w-6 h-4 text-red-700 border-red-500 border-t-0 hover:border-red-700 border hover:bg-white"
                      onClick={() => setShowAddExpiry(false)}
                      type="button"
                    >
                      <XIcon />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </>

          )
          : null}
      </div>
    </div>
  )
}

export default ExpiryDate
