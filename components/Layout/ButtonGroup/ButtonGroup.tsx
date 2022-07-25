import React from 'react'

interface ButtonGroupPropTypes {
    onClick: (arg: string) => void,
}

const ButtonGroup = ({ onClick }: ButtonGroupPropTypes) => (
  <div className="absolute top-1 right-1">
    <div className="shadow-sm absolute flex w-30 items-center top-5 right-6">
      <button
        className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2"
        // onClick={() => onClick('processing')}
        type="button"
      >
        Processing
      </button>
      <button
        className="w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2"
        // onClick={() => onClick('')}
        type="button"
      >
        All
      </button>
      <button
        className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
        // onClick={() => onClick('completed')}
        type="button"
      >
        Complete
      </button>
    </div>
  </div>
)

export default ButtonGroup
