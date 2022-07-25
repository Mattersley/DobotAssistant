import React, { useContext, useState } from 'react'
import InventoryCard from '../../components/Inventory/InventoryCard/InventoryCard'
import AddInventory from '../../components/Inventory/AddInventoryModal/AddInventory'
import { InventoryContext } from '../../context/InventoryContext/inventoryContext'
import AddNewButtons from '../../components/Layout/AddNewButtons/AddNewButtons'
import SearchBox from '../../components/Layout/SearchBox/SearchBox'

const Inventory = () => {
  const { items, refreshInventory } = useContext(InventoryContext)
  const [openNewModal, setOpenNewModal] = useState(false)

  return (
    <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-2 xl:grid-cols-3 lg:gap-6 mt-20 m-0">
      <AddNewButtons refresh={refreshInventory} setOpenNewModal={setOpenNewModal} title="Add New Item" top={6} />
      <SearchBox />
      {openNewModal && <AddInventory open={openNewModal} setOpen={setOpenNewModal} />}
      {items && Object.entries(items).map((item) => <InventoryCard key={item[0]} item={item} />)}
    </div>
  )
}

export default Inventory
