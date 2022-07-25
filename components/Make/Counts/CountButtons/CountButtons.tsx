import { ChevronDoubleRightIcon, PrinterIcon } from '@heroicons/react/solid'
import React from 'react'
import Tooltip from '../../../Layout/Tooltip/Tooltip'

interface CountButtonsPropTypes {
    printTicket: boolean,
    setPrintTicket: (bool: boolean) => void,
}

const CountButtons = ({ printTicket, setPrintTicket }: CountButtonsPropTypes) => (
  <div className="absolute flex w-52 h-12 right-20 z-0">
    <button
      className="w-full flex-none rounded-l-md shadow text-white bg-green-50 border-l border-t border-b border-gray-300 text-base font-medium text-green-700 text-black bg-green-50 hover:bg-white px-3 py-2"
      type="button"
    >
      <div className="flex flex-row align-middle justify-evenly">
        <ChevronDoubleRightIcon width={22} />
        <p>Start Making</p>
      </div>
    </button>
    <Tooltip content="Print a count ticket" placement="bottom">
      <button
        className="w-full border text-base font-medium rounded-r-md border-gray-300 text-black bg-gray-50 text-gray-700 hover:bg-white px-4 py-2 shadow"
        onClick={() => setPrintTicket(!printTicket)}
        type="button"
      >
        <PrinterIcon width={22} />
      </button>
    </Tooltip>
  </div>
)

export default CountButtons
