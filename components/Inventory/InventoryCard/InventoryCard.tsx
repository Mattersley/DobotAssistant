import { arrayRemove, arrayUnion } from 'firebase/firestore'
import React, { useContext, useState } from 'react'

import CardDropdown from './Dropdown/Dropdown'
import Categories from './Categories/Categories'
import ExpiryDate from './ExpiryDate/ExpiryDate'
import Suppliers from './Suppliers/Suppliers'
import Tooltip from '../../Layout/Tooltip/Tooltip'

import { InventoryContext } from '../../../context/InventoryContext/inventoryContext'
import { IconDownChevron, IconUpChevron } from '../../Orders/OrderCards/OrderCards.svg'
import InventoryCardPropTypes from './InventoryCard.types'

const InventoryCard = ({ item }: InventoryCardPropTypes): JSX.Element => {
  const { deleteInventoryItem, refreshInventory, updateInventory } = useContext(InventoryContext)
  const name = item[0]
  const {
    category, manufacturer, expirationDate, formatUnits, formatSize, parLevel, stockLevel, suppliers,
  } = item[1]
  const [UIStockLevel, setUIStockLevel] = useState(stockLevel)

  const stockProgress = (stock: number, par: number) => Math.round((stock / par) * 100)

  const addOrRemoveCategory = (addOrRemove: string, newCategory: string) => {
    const whichArrayFunction = addOrRemove === 'add' ? arrayUnion(newCategory) : arrayRemove(newCategory)
    updateInventory(name, { category: whichArrayFunction })
  }

  const addExpiry = ({ expiryValues }: { expiryValues: { expiryDate: Date, expiryQuantity: number }}) => {
    updateInventory(name, { expirationDate: arrayUnion(expiryValues) })
  }

  const changeLevels = (stockOrPar: string, level: number) => {
    if (stockOrPar === 'stock') {
      updateInventory(name, { stockLevel: level })
    } else if (stockOrPar === 'par') {
      updateInventory(name, { parLevel: level })
    }
  }

  const handleDelete = () => {
    deleteInventoryItem(name)
    refreshInventory()
  }

  const handleStockChangeClicked = (increaseOrDecrease: string) => {
    if (increaseOrDecrease === 'decrease' && (UIStockLevel - 1) >= 0) {
      setUIStockLevel(UIStockLevel - 1)
      changeLevels('stock', stockLevel - 1)
    }
    if (increaseOrDecrease === 'increase' && (UIStockLevel + 1) <= parLevel) {
      setUIStockLevel(UIStockLevel + 1)
      changeLevels('stock', stockLevel + 1)
    }
  }

  return (
    <div className="relative col-span-1 shadow-lg rounded-2xl p-4 bg-opacity-5 w-auto m-3 z-0">
      <div className="flex align-start justify-between mb-4 z-10">
        <div className="flex items-center justify-between">
          {/* <span className="rounded-3xl relative p-2 bg-blue-100 -z-10"> */}
          {/*  <IconPlaceholder /> */}
          {/* </span> */}
          <div className="flex flex-col">
            <span className="font-bold text-lg text-black dark:text-white ml-2">
              {name}
            </span>
            <span className="font-mono text-sm text-gray-500 dark:text-white ml-2">
              {`${formatSize} ${formatUnits}`}
            </span>
            <span className="font-mono text-xs text-gray-500 dark:text-white ml-2">
              {manufacturer}
            </span>
          </div>
        </div>
        <div className="text-donutPurple grid grid-cols-4 align-middle justify-between">
          <div className="col-span-1">
            <Tooltip content="Decrease Stock" placement="bottom">
              <button
                className="hover:text-donutPurple"
                disabled={(UIStockLevel - 1) < 0}
                onClick={() => handleStockChangeClicked('decrease')}
                type="button"
              >
                <IconDownChevron />
              </button>
            </Tooltip>
          </div>
          <span className="col-span-2 text-md text-center">
            <span className="font-bold dark:text-white">
              {` ${UIStockLevel} / ${parLevel}`}
            </span>
          </span>
          <div className="col-span-1">
            <Tooltip content="Increase Stock" placement="bottom">
              <button
                className="hover:text-donutPurple"
                disabled={(UIStockLevel + 1) > parLevel}
                onClick={() => handleStockChangeClicked('increase')}
                type="button"
              >
                <IconUpChevron />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* <button className={`${inUse ? 'bg-green-100' : 'bg-red-100'} border p-1 border-gray-200 rounded-full`} type="button"> */}
        {/*  {inUse ? <CheckIcon className="w-6 h-6 text-green-700" /> : <BanIcon className="w-6 h-6 text-red-700" />} */}
        {/* </button> */}
        <CardDropdown handleDelete={handleDelete} type="inventory" />
      </div>
      {/* <div className="block m-auto z-10"> */}

      {/*   <div className="w-full h-5 bg-gray-200 rounded-full mt-2"> */}
      {/*    <div */}
      {/*      className="h-full text-center text-xs text-white bg-pink-400 rounded-full" */}
      {/*      style={{ width: `${stockProgress(UIStockLevel, parLevel)}%` }} */}
      {/*    /> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
        {suppliers && <Suppliers suppliers={suppliers} />}
        <ExpiryDate addExpiry={addExpiry} date={expirationDate} />
        <div className="flex flex-col items-center justify-start z-10">
          <p className="font-mono px-2 py-1 text-xs font-semibold mb-2 border-b">
            CATEGORIES:
            {' '}
          </p>
          <Categories addOrRemoveCategory={addOrRemoveCategory} categories={category.sort()} />
        </div>
      </div>

      <div
        className="absolute h-full bg-white rounded-2xl top-0 left-0 z-0"
        style={{ width: `${stockProgress(UIStockLevel, parLevel)}%`, zIndex: -20 }}
      />
    </div>
  )
}
export default InventoryCard
