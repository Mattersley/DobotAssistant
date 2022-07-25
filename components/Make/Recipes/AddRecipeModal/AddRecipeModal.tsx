import React, { useCallback, useContext, useState } from 'react'

import AddRecipeModalPageOne from './Page1/AddRecipeModalPageOne'
import Modal from '../../../Layout/Modal/Modal'
import Success from './Success/Success'

import { MakeContext } from '../../../../context/MakeContext/makeContext'
import AddRecipeModalInitialState from './AddRecipeModal.initial'
import { AddRecipeModalTypes } from './AddRecipeModal.types'

const AddRecipeModal = ({ open, setOpen }: AddRecipeModalTypes['props']) => {
  const { addRecipe, refreshRecipes } = useContext(MakeContext)
  const [success, setSuccess] = useState(false)
  const [values, setValues]: AddRecipeModalTypes['state']['values'] = useState(AddRecipeModalInitialState)

  const handleChange = useCallback((event: { target: { name: string; value: string } }) => {
    setValues((vals) => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const handleSubmit = () => {
    const { recipeName, ...rest } = values as AddRecipeModalTypes['values']

    const ingredientsToObj = Object.keys(rest)
      .filter((key) => key.includes('ingredient'))
      .filter((key) => key.includes('Name'))
      .reduce((obj, key) => {
        const index = key.charAt(key.length - 1)
        Object.assign(obj, {
          [rest[key]]: {
            amount: rest[`ingredientAmount${index}`],
            amountUnits: rest[`ingredientAmountUnits${index}`],
          },
        })
        return obj
      }, {})

    const productsMadeWithRecipe = Object.keys(rest)
      .filter((key) => key.includes('product'))
      .reduce((obj, key) => {
        obj.push(rest[key])
        return obj
      }, [] as string[])

    const otherFields = Object.keys(rest)
      .filter((key) => !key.includes('ingredient'))
      .filter((key) => !key.includes('product'))
      .reduce((obj, key) => {
        obj[key] = rest[key]
        return obj
      }, {} as Partial<AddRecipeModalTypes['values']>)

    const data = { ingredients: ingredientsToObj, productsMadeWithRecipe, ...otherFields }
    addRecipe({ data, name: recipeName })
      .then(() => {
        refreshRecipes()
        setSuccess(true)
        refreshRecipes()
      })
  }

  return (
    <Modal
      childSubtitle="Details"
      mainSubtitle="Recipe Information"
      modalTitle="Add A New Recipe"
      setShowModal={setOpen}
      showModal={open}
      submitSuccess={success}
    >
      {success
        ? <Success recipeName={values.recipeName} />
        : <AddRecipeModalPageOne handleChange={handleChange} handleSubmit={handleSubmit} />}
    </Modal>
  )
}

export default AddRecipeModal
