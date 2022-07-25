import React, {
  Dispatch, SetStateAction, useContext, useState,
} from 'react'
import { useRouter } from 'next/router'
import AddInventoryPageOne from './Page1/AddInventoryPageOne'
import AddInventoryPageTwo from './Page2/AddInventoryPageTwo'
import { AddInventoryPropTypes, AddInventoryValueTypes } from './AddInventory.types'
import { InventoryContext } from '../../../context/InventoryContext/inventoryContext'
import AddInventorySuccess from './Success/AddInventorySuccess'
import Modal from '../../Layout/Modal/Modal'
import inventoryInitialValues from './AddInventory.initial'

const AddInventory = ({ open, setOpen }: AddInventoryPropTypes) => {
  const router = useRouter()

  const { setInventoryItem } = useContext(InventoryContext)

  const [page, setPage] = useState(0)
  const [success, setSuccess] = useState(false)
  const [values, setValues]: [AddInventoryValueTypes, Dispatch<SetStateAction<AddInventoryValueTypes>>] = useState(inventoryInitialValues)

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setValues((vals) => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = () => {
    const {
      expirationDate: expiry, supplierName, supplierLeadTime, supplierLeadTimeUnits,
      supplierCost, supplierContactName, supplierContactEmail,
      supplierContactPhone, supplierUrl, supplierShippingCost, supplierShippingNotes, itemName, category, ...rest
    } = values
    const suppliers = {
      [supplierName]: {
        supplierCost, supplierLeadTime, supplierLeadTimeUnits, supplierContactName, supplierContactPhone, supplierContactEmail, supplierUrl, supplierShippingCost, supplierShippingNotes,
      },
    }
    const expirationDate = new Date(expiry)

    const data = {
      category: category.split(','),
      expirationDate,
      ...rest,
      suppliers,
    }
    setInventoryItem({ data, name: itemName })
      .then(() => {
        setSuccess(true)
        setPage(3)
        router.push('/inventory').then()
      })
  }

  const titleChanger = (pageNumber: number, type: 'child' | 'main') => {
    const childTitles: Record<number, string> = {
      0: 'Specifications of the Item',
      1: 'Details of Purchase',
      3: 'Inventory Item Added to Database',
    }
    const mainTitles: Record<number, string> = {
      0: 'Item Information',
      1: 'Supplier Information',
      3: 'Success!',
    }
    if (type === 'child') {
      return childTitles[pageNumber]
    }
    return mainTitles[pageNumber]
  }

  return (
    <Modal
      childSubtitle={titleChanger(page, 'child')}
      mainSubtitle={titleChanger(page, 'main')}
      modalTitle="Add A New Item"
      setShowModal={setOpen}
      showModal={open}
      submitSuccess={success}
    >
      <>
        {page === 0 ? (
          <AddInventoryPageOne
            handleChange={handleChange}
            setPage={setPage}
          />
        ) : null}
        {page === 1 ? (
          <AddInventoryPageTwo
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setPage={setPage}
          />
        ) : null}
        {success && (
        <AddInventorySuccess
          setOpen={setOpen}
          setPage={setPage}
          setSuccess={setSuccess}
        />
        )}
      </>
    </Modal>
  )
}

export default AddInventory
