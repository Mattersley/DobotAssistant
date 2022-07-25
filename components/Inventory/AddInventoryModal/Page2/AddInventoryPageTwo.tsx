import { PlusIcon } from '@heroicons/react/solid'
import { PagePropTypes } from '../AddInventory.types'
import Tooltip from '../../../Layout/Tooltip/Tooltip'
import FormInput from '../../../Layout/Input/FormInput/FormInput'

const AddInventoryPageTwo = ({ handleChange, handleSubmit, setPage }: PagePropTypes) => (
  <div className="mt-5 md:mt-0 md:col-span-4">
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6 w-full text-left">

        <div className="grid grid-cols-6 gap-6">
          <div className="flex border-b-2 border-donutPink col-span-6 pb-1 justify-between">
            Suppliers
            <button
              className="col-span-3 mt-auto h-8 w-8 p-1 text-green-700"
              type="button"
            >
              <PlusIcon />
            </button>
          </div>
          <FormInput
            className="col-span-6 sm:col-span-6"
            handleChange={handleChange}
            inputType="text"
            title="Supplier Name"
          />
          <FormInput
            className="col-span-6"
            handleChange={handleChange}
            inputType="text"
            title="Supplier Url"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="number"
            title="Supplier Cost"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="number"
            title="Supplier Shipping Cost"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="textbox"
            title="Supplier Shipping Notes"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="number"
            title="Supplier Lead Time"
            tooltipPlacement="bottom"
            tooltipText="Units of time required to obtain item e.g. 2 for 2 days"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="text"
            title="Supplier Lead Time Units"
            tooltipPlacement="bottom"
            tooltipText="e.g. 'days' or 'months"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="text"
            title="Supplier Contact Name"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="email"
            title="Supplier Contact Email"
          />
          <FormInput
            className="col-span-6 sm:col-span-2"
            handleChange={handleChange}
            inputType="number"
            title="Supplier Contact Phone"
          />

          <div className="border-b-2 border-donutPink col-span-6 pb-2">Categories</div>
          <FormInput
            className="col-span-6"
            handleChange={handleChange}
            inputType="textbox"
            title="Category"
            tooltipPlacement="top"
            tooltipText="Separate categories by a comma"
          />

          <div className="border-b-2 border-donutPink col-span-6 pb-2">Itemisation</div>
          <FormInput
            className="col-span-6 sm:col-span-3"
            handleChange={handleChange}
            inputType="number"
            title="Per Dough2 Donut"
            tooltipPlacement="top"
            tooltipText="Amount of Dough2 Donuts that can be made with one unit of this item"
          />
          <FormInput
            className="col-span-6 sm:col-span-3"
            handleChange={handleChange}
            inputType="number"
            title="Per Dough1 Donut"
            tooltipPlacement="top"
            tooltipText="Amount of Dough1 Donuts that can be made with one unit of this item"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-row justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-donutPink hover:bg-donutPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setPage(0)}
        type="button"
      >
        Previous
      </button>
      <Tooltip content="Ensure all your information is correct as this will write to the database, you can click 'Previous' without losing information" placement="left">
        <button
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-green-600 hover:text-green-600 hover:bg-white hover:border-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
          type="button"
        >
          Submit
        </button>
      </Tooltip>
    </div>
  </div>
)

export default AddInventoryPageTwo
