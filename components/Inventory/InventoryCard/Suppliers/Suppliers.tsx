import React from 'react'
import { SuppliersPropTypes } from '../../../Make/Recipes/Recipes.types'

const Suppliers = ({ suppliers }: SuppliersPropTypes) => (
  <div className="flex flex-col items-center justify-between mb-4">
    <p className="font-mono px-2 py-1 text-xs font-semibold mb-2 border-b">
      SUPPLIERS:
      {' '}
    </p>
    {Object.entries(suppliers).map((supplier) => (
      <div key={supplier[0]} className="flex flex-col items-center justify-between mb-4">
        <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-700 bg-green-50 mb-2">
          <a className="cursor-pointer" href={supplier[1].supplierUrl} rel="noreferrer" target="_blank">{supplier[0]}</a>
        </span>
        <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-700 bg-green-50 mb-2">
          {`Lead Time: ${supplier[1].supplierLeadTime} ${supplier[1].supplierLeadTimeUnits}`}
        </span>
        <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-700 bg-green-50">
          {`$${supplier[1].supplierCost}`}
        </span>
      </div>
    ))}
  </div>
)

export default Suppliers
