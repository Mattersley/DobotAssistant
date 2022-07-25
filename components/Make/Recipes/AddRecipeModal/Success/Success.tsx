import React from 'react'

interface SuccessPropTypes {
    recipeName: string
}

const Success = ({ recipeName }: SuccessPropTypes) => (
  <div className="mt-5 md:mt-0 col-span-6">
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6 w-full">
        <div className="w-full">
          <p>{`Successfully added the recipe ${recipeName}`}</p>
        </div>
      </div>
    </div>
  </div>
)
export default Success
