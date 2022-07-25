import { useContext } from 'react'
import { Placement } from 'tippy.js'
import DynamicInputs from '../../../../Layout/DynamicInputs/DynamicInputs'
import FormInput from '../../../../Layout/Input/FormInput/FormInput'
import Tooltip from '../../../../Layout/Tooltip/Tooltip'

import { ProductContext } from '../../../../../context/ProductContext/productContext'
import { InventoryContext } from '../../../../../context/InventoryContext/inventoryContext'

import { PagePropTypes } from '../../../../Inventory/AddInventoryModal/AddInventory.types'
import { addItemsToArray } from '../../../../../shared/helper'

const AddRecipeModalPageOne = ({ handleChange, handleSubmit }: Omit<PagePropTypes, 'setPage'>) => {
  const { items } = useContext(InventoryContext)
  const { productNames } = useContext(ProductContext)

  const ingredientGroupSetup = {
    'Ingredient Name': {
      dropdownList: Object.keys(items),
      placeholder: 'Pick an Ingredient',
      type: 'dropdown',
    },
    'Ingredient Amount': {
      type: 'number',
    },
    'Ingredient Amount Units': {
      tooltipPlacement: 'top' as Placement,
      tooltipText: 'e.g. "grams" or "ml"',
      type: 'text',
    },
  }

  const productGroupSetup = {
    Product: {
      dropdownList: addItemsToArray(['All Products', 'Dough1 Donuts', 'Dough2 Donuts'], productNames),
      placeholder: 'Pick a Product',
      type: 'dropdown',
    },
  }

  return (
    <div className="mt-5 md:mt-0 col-span-6">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6 w-full">
          <div className="grid grid-cols-6 gap-6">
            <div className="border-b-2 border-donutPink col-span-6 pb-2">Name</div>
            <FormInput
              className="col-span-5 sm:col-span6"
              handleChange={handleChange}
              inputType="text"
              title="Recipe Name"
            />
            <FormInput
              className="col-span-1 sm:col-span6"
              handleChange={handleChange}
              inputType="number"
              title="Recipe Yield"
            />
            <FormInput
              className="col-span-6 sm:col-span6"
              handleChange={handleChange}
              inputType="textbox"
              title="Directions"
              tooltipPlacement="top"
              tooltipText="Add a timer using '#' - e.g. #1:30 would add a timer for 1 minute and 30 seconds"
            />
          </div>
          <DynamicInputs
            addButtonTooltipMessage="Add another ingredient"
            formTitle="Ingredients"
            handleChange={handleChange}
            inputGroupSetup={ingredientGroupSetup}
          />
          <DynamicInputs
            addButtonTooltipMessage="Add another product"
            formTitle="Part of Products:"
            handleChange={handleChange}
            inputGroupSetup={productGroupSetup}
          />
        </div>
        <div className="bg-gray-50 w-full px-4 py-3 sm:px-6 text-right col-span-6">
          <Tooltip content="Ensure all your information is correct as this will write to the database" placement="left">
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
    </div>
  )
}

export default AddRecipeModalPageOne
