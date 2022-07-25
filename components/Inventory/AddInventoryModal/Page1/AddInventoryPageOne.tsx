import { useState } from 'react'
import { PagePropTypes } from '../AddInventory.types'
import FormInput from '../../../Layout/Input/FormInput/FormInput'

const AddInventoryPageOne = ({ handleChange, setPage }: Pick<PagePropTypes, 'handleChange' | 'setPage' >) => {
  const [perishable, setPerishable] = useState(false)

  return (
    <div className="mt-5 md:mt-0 md:col-span-4">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6 w-full">
          <div className="grid grid-cols-6 gap-6">
            <div className="border-b-2 border-donutPink col-span-6 pb-2 mb-1">Name & Size</div>
            <FormInput className="col-span-6" handleChange={handleChange} inputType="text" title="Item Name" />
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="text"
              title="Manufacturer"
            />
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="number"
              title="Format Size"
              tooltipPlacement="bottom"
              tooltipText="Units of size, e.g. 200 for 200g"
            />
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="text"
              title="Format Units"
              tooltipPlacement="bottom"
              tooltipText="eg. 'grams' or 'millilitres' etc"
            />

            <div className="border-b-2 border-donutPink col-span-6 pb-2">Expiry</div>
            <div className="grid grid-cols-7 col-span-6 gap-6 text-center">
              <div className="col-span-7 sm:col-span-1 h-auto sm:h-16">
                <label className="block text-sm font-medium text-gray-700" htmlFor="perishable">
                  Perishable?
                </label>
                <input
                  autoComplete="perishable"
                  className="mt-1 focus:ring-donutPurple focus:border-donutPurple text-donutPurple block shadow-sm mx-auto sm:text-sm border-gray-300 rounded-md"
                  id="perishable"
                  name="perishable"
                  onChange={() => setPerishable(!perishable)}
                  type="checkbox"
                />
              </div>
              {perishable && (
              <>
                <FormInput
                  className="col-span-7 sm:col-span-4"
                  handleChange={handleChange}
                  inputType="date"
                  title="Expiration Date"
                  tooltipPlacement="bottom"
                  tooltipText="Actual date of earliest expiry"
                />
                <FormInput
                  className="col-span-7 sm:col-span-2"
                  handleChange={handleChange}
                  inputType="number"
                  title="Expiration Quantity"
                  tooltipPlacement="bottom"
                  tooltipText="Amount of items with this expiry date"
                />
              </>
              )}
            </div>

            <div className="border-b-2 border-donutPink col-span-6 pb-2">Stock</div>
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="number"
              title="Par Level"
              tooltipPlacement="bottom"
              tooltipText="Number of items to keep in stock"
            />
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="number"
              title="Stock Level"
              tooltipPlacement="bottom"
              tooltipText="Current # items in stock"
            />
            <FormInput
              className="col-span-6 sm:col-span-2"
              handleChange={handleChange}
              inputType="number"
              title="Alert at Stock Level"
              tooltipPlacement="bottom"
              tooltipText="When stock level reaches this number you will receive an alert"
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setPage(1)}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddInventoryPageOne
